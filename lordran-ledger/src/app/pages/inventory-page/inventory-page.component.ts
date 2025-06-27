// features/inventory/pages/inventory-page/inventory-page.component.ts
import { Component, OnInit } from "@angular/core";
import { Item, ItemForm } from "../../models/item.model"; // Caminho corrigido
import { ItemService } from "../../services/item.service"; // Caminho corrigido
import { MessageService, ConfirmationService } from "primeng/api";
import { Observable } from "rxjs";

@Component({
  selector: "app-inventory-page",
  templateUrl: "./inventory-page.component.html",
  styleUrls: ["./inventory-page.component.scss"],
  // MessageService e ConfirmationService são fornecidos em AppModule,
  // então não há necessidade de fornecê-los aqui, a menos que sejam específicos para esta instância de componente.
})
export class InventoryPage implements OnInit {
  // Observável para manter a lista de itens, assinado no template usando o pipe assíncrono
  items$: Observable<Item[]> | undefined;

  // Variáveis de estado para o diálogo Adicionar/Editar Item
  displayFormDialog = false;
  isEditing = false;
  currentItem: Item | null = null; // Armazena o item que está sendo editado

  // Variáveis de estado para o diálogo de Detalhes do Item
  displayDetailDialog = false;
  selectedItem: Item | null = null; // Armazena o item selecionado para visualização detalhada

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  /**
   * Hook de ciclo de vida: Chamado uma vez, após o primeiro ngOnChanges().
   * Assina o serviço de item para obter a lista de itens.
   */
  ngOnInit(): void {
    this.items$ = this.itemService.getItems();
  }

  /**
   * Abre o diálogo para adicionar um novo item.
   * Reinicia o formulário e define o modo de edição como falso.
   */
  openNewItemDialog(): void {
    this.isEditing = false;
    this.currentItem = null; // Garante que nenhum dado de item seja pré-preenchido para um novo item
    this.displayFormDialog = true;
  }

  /**
   * Abre o diálogo para editar um item existente.
   * Define o item atual e o modo de edição como verdadeiro.
   * @param item O item a ser editado.
   */
  openEditDialog(item: Item): void {
    this.currentItem = item; // Passa o item para o diálogo do formulário
    this.isEditing = true;
    this.displayFormDialog = true;
  }

  /**
   * Abre o diálogo para exibir informações detalhadas sobre um item.
   * @param item O item para exibir detalhes.
   */
  openDetailDialog(item: Item): void {
    this.selectedItem = item;
    this.displayDetailDialog = true;
  }

  /**
   * Lida com o salvamento de um item (adicionando um novo ou atualizando um existente).
   * Este método é chamado quando o evento 'save' é emitido do ItemFormDialogComponent.
   * @param itemForm Os dados do formulário do item a ser salvo.
   */
  saveItem(itemForm: ItemForm): void {
    if (this.isEditing && this.currentItem) {
      // Se estiver editando, use o ID do item atual para a operação de atualização
      this.itemService.updateItem(this.currentItem.id, itemForm);
      this.messageService.add({
        severity: "success",
        summary: "Item Atualizado",
        detail: "O item foi atualizado com sucesso",
      });
    } else {
      // Se não estiver editando, adicione um novo item
      this.itemService.addItem(itemForm);
      this.messageService.add({
        severity: "success",
        summary: "Item Adicionado",
        detail: "Novo item foi adicionado ao seu inventário",
      });
    }
    this.displayFormDialog = false; // Fecha o diálogo do formulário após salvar
  }

  /**
   * Lida com a exclusão de um item.
   * Pede confirmação antes de excluir.
   * @param item O item a ser excluído.
   */
  deleteItem(item: Item): void {
    this.confirmationService.confirm({
      message: `Tem certeza de que deseja descartar ${item.name}?`,
      header: "Confirmar Exclusão",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        // Exclua apenas se item.id for definido (deve ser sempre para itens existentes)
        this.itemService.deleteItem(item.id);
        this.messageService.add({
          severity: "warn",
          summary: "Item Descartado",
          detail: "O item foi removido do seu inventário",
        });
      },
    });
  }

  /**
   * Callback para quando a visibilidade do diálogo do formulário muda (por exemplo, fechado pelo usuário).
   * Atualiza o estado displayFormDialog.
   * @param visible O novo estado de visibilidade.
   */
  onFormDialogClose(visible: boolean): void {
    this.displayFormDialog = visible;
  }

  /**
   * Callback para quando a visibilidade do diálogo de detalhes muda.
   * Atualiza o estado displayDetailDialog.
   * @param visible O novo estado de visibilidade.
   */
  onDetailDialogClose(visible: boolean): void {
    this.displayDetailDialog = visible;
  }
}
