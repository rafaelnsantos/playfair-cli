let alfabeto = []

for (let i = 65; i < 91; i++) {
  if (i != 74) alfabeto.push(String.fromCharCode(i))
}

let { mensagem, chave, opcao } = require('minimist')(process.argv.slice(2))
mensagem = mensagem.toUpperCase()
chave = chave.toUpperCase()

const matriz = new Array(5)
for (let i = 0; i < 5; i++) {
  matriz[i] = new Array(5)
}

let letrasUsadas = []
let x = 0
let a = 0
for (let i = 0; i < 25; i++) {
  if (chave.length > x) {
    if (letrasUsadas.includes(chave[x])) {
      i--
    } else {
      matriz[parseInt(i / 5)][i % 5] = chave[x]
      letrasUsadas.push(chave[x])
    }
    x++
  } else {
    if (letrasUsadas.includes(alfabeto[a])) {
      i--
    } else {
      matriz[parseInt(i / 5)][i % 5] = alfabeto[a]
    }
    a++
  }
}

let mensagemPreparada = []

for(let i = 0; i < mensagem.length; i+=2) {
  if (mensagem[i] == mensagem[i + 1]) {
    mensagemPreparada.push([mensagem[i], 'X'])
    i--
  } else {
    mensagemPreparada.push([mensagem[i], mensagem[i+1] || 'Z'])
  }
}

const passo = opcao == 'CRIPTOGRAFAR' ? 1 : -1

const resposta = mensagemPreparada.map(tuple => {
  let x
  let y

  if (tuple[0] == 'J') tuple[0] = 'I'
  if (tuple[1] == 'J') tuple[1] = 'I'

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matriz[i][j] == tuple[0]) x = [i, j]
      if (matriz[i][j] == tuple[1]) y = [i, j]
    }
  }
  if (x[0] == y[0]) {
    const linha = x[0]
    return [matriz[linha][mod((x[1] + passo), 5)], matriz[linha][mod((y[1] + passo), 5)]]
  }
  else if (x[1] == y[1]) {
    const coluna = x[1]
    return [matriz[mod((x[0] + passo), 5)][coluna], matriz[mod((y[0] + passo), 5)][coluna]]
  } else {
    return [matriz[x[0]][y[1]], matriz[y[0]][x[1]]]
  }
})
console.log(resposta.join('').replace(new RegExp(',', 'g'), ''))

function mod(n, m) {
  return ((n % m) + m) % m;
}