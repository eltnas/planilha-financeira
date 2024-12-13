import json
from datetime import datetime
import os

class GerenciadorFinanceiro:
    def __init__(self, arquivo='financas.json'):
        self.arquivo = arquivo
        self.transacoes = self.carregar_transacoes()

    def carregar_transacoes(self):
        """Carrega transações do arquivo JSON."""
        if os.path.exists(self.arquivo):
            with open(self.arquivo, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {'entradas': [], 'saidas': []}

    def salvar_transacoes(self):
        """Salva transações no arquivo JSON."""
        with open(self.arquivo, 'w', encoding='utf-8') as f:
            json.dump(self.transacoes, f, ensure_ascii=False, indent=4)

    def adicionar_entrada(self, valor, categoria, descricao=''):
        """Adiciona uma nova entrada financeira."""
        entrada = {
            'valor': float(valor),
            'categoria': categoria,
            'descricao': descricao,
            'data': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        self.transacoes['entradas'].append(entrada)
        self.salvar_transacoes()
        print(f"Entrada de R${valor:.2f} na categoria '{categoria}' adicionada com sucesso!")

    def adicionar_saida(self, valor, categoria, descricao=''):
        """Adiciona uma nova saída financeira."""
        saida = {
            'valor': float(valor),
            'categoria': categoria,
            'descricao': descricao,
            'data': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        self.transacoes['saidas'].append(saida)
        self.salvar_transacoes()
        print(f"Saída de R${valor:.2f} na categoria '{categoria}' registrada com sucesso!")

    def calcular_saldo(self):
        """Calcula o saldo total."""
        total_entradas = sum(entrada['valor'] for entrada in self.transacoes['entradas'])
        total_saidas = sum(saida['valor'] for saida in self.transacoes['saidas'])
        return total_entradas - total_saidas

    def listar_transacoes(self, tipo=None, categoria=None):
        """Lista transações, com opção de filtrar por tipo e/ou categoria."""
        if tipo not in [None, 'entradas', 'saidas']:
            print("Tipo inválido. Use 'entradas' ou 'saidas'.")
            return []

        if tipo:
            transacoes_filtradas = self.transacoes[tipo]
        else:
            transacoes_filtradas = self.transacoes['entradas'] + self.transacoes['saidas']

        if categoria:
            transacoes_filtradas = [
                t for t in transacoes_filtradas 
                if t['categoria'].lower() == categoria.lower()
            ]

        return transacoes_filtradas

    def relatorio_por_categoria(self, tipo):
        """Gera relatório agrupando valores por categoria."""
        if tipo not in ['entradas', 'saidas']:
            print("Tipo inválido. Use 'entradas' ou 'saidas'.")
            return {}

        relatorio = {}
        for transacao in self.transacoes[tipo]:
            categoria = transacao['categoria']
            valor = transacao['valor']
            relatorio[categoria] = relatorio.get(categoria, 0) + valor

        return relatorio

def menu_principal():
    """Menu interativo para o gerenciador financeiro."""
    gerenciador = GerenciadorFinanceiro()

    while True:
        print("\n--- Gerenciador Financeiro ---")
        print("1. Adicionar Entrada")
        print("2. Adicionar Saída")
        print("3. Consultar Saldo")
        print("4. Listar Transações")
        print("5. Relatório por Categoria")
        print("6. Sair")

        opcao = input("Escolha uma opção: ")

        try:
            if opcao == '1':
                valor = float(input("Digite o valor da entrada: "))
                categoria = input("Digite a categoria (ex: Salário, Freelance): ")
                descricao = input("Digite uma descrição (opcional): ")
                gerenciador.adicionar_entrada(valor, categoria, descricao)

            elif opcao == '2':
                valor = float(input("Digite o valor da saída: "))
                categoria = input("Digite a categoria (ex: Alimentação, Transporte): ")
                descricao = input("Digite uma descrição (opcional): ")
                gerenciador.adicionar_saida(valor, categoria, descricao)

            elif opcao == '3':
                saldo = gerenciador.calcular_saldo()
                print(f"\nSaldo atual: R${saldo:.2f}")

            elif opcao == '4':
                print("\nFiltros de Transações:")
                print("1. Todas as Transações")
                print("2. Apenas Entradas")
                print("3. Apenas Saídas")
                print("4. Filtrar por Categoria")
                
                filtro = input("Escolha uma opção de filtro: ")
                
                if filtro == '1':
                    transacoes = gerenciador.listar_transacoes()
                elif filtro == '2':
                    transacoes = gerenciador.listar_transacoes('entradas')
                elif filtro == '3':
                    transacoes = gerenciador.listar_transacoes('saidas')
                elif filtro == '4':
                    tipo = input("Digite o tipo (entradas/saidas): ")
                    categoria = input("Digite a categoria: ")
                    transacoes = gerenciador.listar_transacoes(tipo, categoria)
                else:
                    print("Opção inválida.")
                    continue

                if transacoes:
                    print("\n--- Transações ---")
                    for t in transacoes:
                        print(f"Data: {t['data']} | "
                              f"Valor: R${t['valor']:.2f} | "
                              f"Categoria: {t['categoria']} | "
                              f"Descrição: {t.get('descricao', 'N/A')}")
                else:
                    print("Nenhuma transação encontrada.")

            elif opcao == '5':
                tipo = input("Digite o tipo para relatório (entradas/saidas): ")
                relatorio = gerenciador.relatorio_por_categoria(tipo)
                
                print(f"\n--- Relatório de {tipo.capitalize()} ---")
                for categoria, total in relatorio.items():
                    print(f"{categoria}: R${total:.2f}")

            elif opcao == '6':
                print("Encerrando o Gerenciador Financeiro...")
                break

            else:
                print("Opção inválida. Tente novamente.")

        except ValueError:
            print("Entrada inválida. Verifique os valores digitados.")
        except Exception as e:
            print(f"Ocorreu um erro: {e}")

if __name__ == "__main__":
    menu_principal()