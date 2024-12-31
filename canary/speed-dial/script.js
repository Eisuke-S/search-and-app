class SpeedDial {
    constructor() {
        this.desktop = document.getElementById('desktop');
        this.addButton = document.getElementById('addButton');
        this.modal = document.getElementById('addModal');
        this.titleInput = document.getElementById('title');
        this.urlInput = document.getElementById('url');
        this.saveButton = document.getElementById('saveButton');
        this.cancelButton = document.getElementById('cancelButton');
        
        this.dials = [];
        this.draggedDial = null;

        this.initializeEventListeners();
        this.loadDials();
    }

    initializeEventListeners() {
        this.addButton.addEventListener('click', () => this.showModal());
        this.saveButton.addEventListener('click', () => this.saveDial());
        this.cancelButton.addEventListener('click', () => this.hideModal());

        this.desktop.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingElement = document.querySelector('.dragging');
            if (!draggingElement) return;
            
            const closestDial = this.getClosestDial(e.clientX, e.clientY);
            if (closestDial) {
                const draggingIndex = Array.from(this.desktop.children).indexOf(draggingElement);
                const closestIndex = Array.from(this.desktop.children).indexOf(closestDial);
                
                if (draggingIndex < closestIndex) {
                    closestDial.parentNode.insertBefore(draggingElement, closestDial.nextSibling);
                } else {
                    closestDial.parentNode.insertBefore(draggingElement, closestDial);
                }
                this.updateDialPositions();
            }
        });
    }

    getClosestDial(x, y) {
        const dials = [...this.desktop.querySelectorAll('.dial:not(.dragging)')];
        return dials.reduce((closest, dial) => {
            const box = dial.getBoundingClientRect();
            const offset = Math.sqrt(
                Math.pow(x - (box.left + box.width / 2), 2) +
                Math.pow(y - (box.top + box.height / 2), 2)
            );
            
            if (!closest || offset < closest.offset) {
                return { element: dial, offset };
            }
            return closest;
        }, null)?.element;
    }

    showModal() {
        this.modal.classList.add('active');
        this.titleInput.value = '';
        this.urlInput.value = '';
    }

    hideModal() {
        this.modal.classList.remove('active');
    }

    async saveDial() {
        const title = this.titleInput.value.trim();
        const url = this.urlInput.value.trim();

        if (!title || !url) return;

        const dial = {
            id: Date.now().toString(),
            title,
            url,
            position: this.dials.length
        };

        this.dials.push(dial);
        await this.saveDialsToStorage();
        this.renderDial(dial);
        this.hideModal();
    }

    createDialElement(dial) {
        const element = document.createElement('div');
        element.className = 'dial';
        element.draggable = true;
        element.dataset.id = dial.id;

        element.addEventListener('dragstart', () => {
            element.classList.add('dragging');
        });

        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
        });

        element.innerHTML = `
            <img class="favicon" src="https://www.google.com/s2/favicons?domain=${new URL(dial.url).hostname}&sz=32" alt="favicon">
            <div class="title">${dial.title}</div>
            <button class="delete-btn">×</button>
        `;

        element.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteDial(dial.id);
        });

        element.addEventListener('click', () => {
            window.open(dial.url, '_blank');
        });        

        return element;
    }

    renderDial(dial) {
        const element = this.createDialElement(dial);
        this.desktop.appendChild(element);
    }

    async deleteDial(id) {
        this.dials = this.dials.filter(dial => dial.id !== id);
        await this.saveDialsToStorage();
        this.renderAllDials();
    }

    renderAllDials() {
        this.desktop.innerHTML = '';
        this.dials.forEach(dial => this.renderDial(dial));
    }

    updateDialPositions() {
        const dialElements = this.desktop.querySelectorAll('.dial');
        this.dials = Array.from(dialElements).map((element, index) => {
            const dialId = element.dataset.id;
            const dial = this.dials.find(d => d.id === dialId);
            return { ...dial, position: index };
        });
        this.saveDialsToStorage();
    }

    async loadDials() {
        try {
            const data = await this.getFromStorage('speedDials');
            this.dials = data?.dials || [];
            this.dials.sort((a, b) => a.position - b.position);
            this.renderAllDials();
        } catch (error) {
            console.error('Failed to load dials:', error);
        }
    }

    async saveDialsToStorage() {
        try {
            await this.setToStorage('speedDials', { dials: this.dials });
        } catch (error) {
            console.error('Failed to save dials:', error);
        }
    }

    getFromStorage(key) {
        return new Promise((resolve) => {
            const data = localStorage.getItem(key);
            resolve(data ? JSON.parse(data) : null);
        });
    }

    setToStorage(key, value) {
        return new Promise((resolve) => {
            localStorage.setItem(key, JSON.stringify(value));
            resolve();
        });
    }
}

// アプリケーションの初期化
new SpeedDial();


