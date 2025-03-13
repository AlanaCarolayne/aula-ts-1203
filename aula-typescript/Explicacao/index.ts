// js puro
let nomeCompleto = "Eva Silva"
const pi = 3.14
let idade = 40

// ts
let nome:string = "Alana"
let idadeT:number =10
const piTipado:number = 3.14

// por inferencia
let sobrenome = "Silva"
let idadeChar = "12"

// Annotation
let sobrenomeAnnotatio:string = "Xavier"
let ativo:boolean = false

// Arrays
let carros:string[] = ["Civic", "City", "TypeR"]
carros.push("BMW")
console.log("Ex. de array");
carros.forEach(carro =>{
    console.log(carro);
})
 
let numeros:number[] = [1, 3, 89, 2]
console.log(numeros.length);
for (let index = 0; index <numeros.length; index++) {
    const element =numeros[index];
    console.log(element);
    
}
numeros.forEach(numero=>{
    console.log(numero);
})

// tipos complexos
let pessoa:{nome:string, idade:number}={
    nome:"",
    idade:0
}
pessoa.nome = "ivo"
pessoa.idade =45
console.log(`Nome: ${pessoa.nome} `);
console.log(`Idade: ${pessoa.idade} `);

// tuplas
let cadastro:[string,number]
let cadastroNovo= ["Eva", 25]
console.log("Nome " + cadastroNovo[0]);
console.log("Idade " + cadastroNovo[1]);
console.log(typeof cadastroNovo[0]);
console.log(typeof cadastroNovo[1


]);

// Criar interface

interface Campeonato{
    id: number
    nome: string
    categoria: string
    tipo: string
    dataInicio: string
    dataFim: string
}

const novoCampeonato : Campeonato = {
    id:Date.now(),
    categoria: "masculino",
    dataFim: "2025-10-30",
    dataInicio: "2025-04-01",
    nome: "Brasil",
    tipo: "pontos-corridos"
}

console.log(`Categoria dp campeonato: ${novoCampeonato.categoria}`);

