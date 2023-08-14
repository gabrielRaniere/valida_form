class ValidaCpf {
    constructor(cpf) {
        Object.defineProperty(this, 'cpfLimpo', {
            value: cpf.replace(/\D+/g, ''),
            enumerable:true,
            writable:false,
            configurable:false
        })
    }

    cpfGerador() {
        const cpfArray = Array.from(this.cpfLimpo).slice(0, -2);
        let cont = 0;
        while(cont < 2) {
            let soma = cpfArray.reduce((acum, valor, i)=>{
                acum += Number(valor) * ((10 + cont) - i)
                return acum
            }, 0);
            soma = (11 - (soma % 11)) > 9 ? 0 : (11 - (soma % 11));
            cpfArray.push(soma);
            cont++
        }
        return cpfArray.join('');
    }

    isSequencia() {
        const repetido = this.cpfLimpo[0].repeat(11);
        return this.cpfLimpo === repetido ? true : false;
    }
    
    validador() {
        if(typeof this.cpfLimpo !== 'string' ||
           this.cpfLimpo.length !== 11 ||
           this.cpfGerador() !== this.cpfLimpo ||
           this.isSequencia()) {
            return false;
        }
        return true;
    }
}