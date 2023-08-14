class ValidaForm {
    constructor() {
        this.formulario = document.querySelector('form');
        this.eventos();
    }
    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    createError(mensagem, field) {
        const div = document.createElement('div');
        div.innerText = mensagem ;
        div.classList.add('error-text');
        // a unica função do field é para inserir a mensagem no html
        field.insertAdjacentElement('afterend', div);
    }

    isValidPass() {
        let valid = true;

        const password1 = this.formulario.querySelector('.senha');
        const password2 = this.formulario.querySelector('.senha-repetir');

        if(password1.value !== password2.value) {
            this.createError('senhas são incompativeis', password2)
            valid = false;
        }

        return valid;
    }

    isvalidfield() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let field of this.formulario.querySelectorAll('.validar')){
            let label = field.previousElementSibling.innerText;
            if(!field.value) {
                this.createError(`o campo '${label}' esta vazio`, field);
                valid = false;
            }
            if(label === 'CPF') {
                if(!this.validaCpf(field))valid = false;
            }
            if(field.classList.contains('usuario')) {
                if(!this.validUser(field)) valid = false;
            }
            if(field.classList.contains('senha')) {
                if(!this.sizePassword(field)) valid = false;
            }
        }
        return valid;
    }

    sizePassword(pass) {
        const password = pass.value;
        if(password.length < 6 || password.length > 12)  {
            this.createError('tamanho de senha invalido', pass);
            return false;
        }
        return true;
    }

    validUser(usuario)  {
        const user = usuario.value
        let valid = true;
        if(user.length < 3 || user.length > 12) {
            this.createError('tamanho de usuário invalido', usuario);
            valid = false;
        }
        // o match retorna true ou false se o user está incluido ...
        if(!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError('usuário deve conter apenas letras e numeros', usuario);
            valid = false;
        }

        return valid;
    }

    validaCpf(input) {
        const cpf = new ValidaCpf(input.value);
        if(!cpf.validador()) this.createError('cpf invalido', input);
        return cpf.validador();
    }

    handleSubmit(e) {
        e.preventDefault();
        const validField = this.isvalidfield();
        const validPassword = this.isValidPass();

        console.log(validField, validPassword)
        if(validField && validPassword) {
            alert('formulario enviado');
            this.formulario.submit(); 
        }
    }
}

const valida = new ValidaForm();