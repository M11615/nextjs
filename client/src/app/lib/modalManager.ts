type ModalCallbacks = Readonly<{
  open: () => void;
  close: () => void;
}>;

class ModalManager {
  private modals: Map<string, ModalCallbacks> = new Map<string, ModalCallbacks>();
  private activeId: string | null = null;

  register(id: string, callbacks: ModalCallbacks) {
    this.modals.set(id, callbacks);
  }

  open(id: string) {
    if (this.activeId && this.activeId !== id) {
      const prev: ModalCallbacks | undefined = this.modals.get(this.activeId);
      prev?.close();
    }
    const current: ModalCallbacks | undefined = this.modals.get(id);
    if (current) {
      this.activeId = id;
      current.open();
    }
  }

  close(id: string) {
    const current: ModalCallbacks | undefined = this.modals.get(id);
    if (current) {
      this.activeId = null;
      current.close();
    }
  }
}

export const modalManager: ModalManager = new ModalManager();
