class CustomSelect {
    constructor(id, labelText, name, classname, options) {
        this.id = id;
        this.labelText = labelText;
        this.name = name;
        this.options = options;
        this.classname = classname;
    }

    render() {
        let htmlStr =  `
            <div class="${this.classname}">
                <label for="${this.id}">${this.labelText}</label>
                <select name="${this.name}" id="${this.id}">
            `;

        htmlStr += this.options.map(option => `<option value="${option.value}">
                            ${option.text}
                        </option>`).join('');
    
        htmlStr += `</select></div>`;
        return htmlStr;
    }
}