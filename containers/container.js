const fs = require('fs');


class Contenedor {

    constructor(textJson) {
        this.textJson = textJson;
        this.data = []
        try {
            this.read()
        } catch (error) {
            this.write()
        }
    }

    read() {
        this.data = JSON.parse(fs.readFileSync(this.textJson));
    }

    write() {
        fs.writeFileSync(this.textJson, JSON.stringify(this.data));
    }
    
    save(obj) {
        const time = new Date().toLocaleString()
        obj['id'] = this.data.length + 1;
        obj['timestamp'] = time;
        this.data.push(obj)
        this.write()

        return obj
    }

    getByID(id) {
        return this.data.find(obj => obj.id == id)
    }

    editCartById(obj , id) {
        obj['id'] = id
        const idx = this.getAll().findIndex(p => p.id === id)
        this.getAll().splice(idx , 0 , obj )
        this.write()
    }

    editCartByBody (obj , id) {
        obj['id'] = id
        const idx = this.getAll().findIndex(p => p.id === obj.id)
        this.getAll().splice(idx , 1 , obj )
        this.write()

        return obj
    }

    editProductById (obj , id) {
        obj['id'] = id
        const idx = this.getAll().findIndex(p => p.id === obj.id)
        this.getAll().splice(idx , 1 , obj )
        this.write()

        return obj
    }

    getAll() {
        return this.data
    }

    deleteByID(id) {
        const idx = this.data.findIndex(obj => obj.id == id)
        this.data.splice(idx, 1)
        this.write()
    }

    deleteAll() {
        this.data = []
        this.write()
    }

}

module.exports = Contenedor;