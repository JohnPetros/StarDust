## Condicionais

<Text>As condicionais permitem que no programa seja definido dseerentes blocos de código, que são executados ou não dependendo se uma determinada condição é verdadeira ou falsa</Text>

<Quote>Existem duas principais estruturas condicionais: *se/senao se/senao* e *escolha-caso*.</Quote>

### Se

<Text>Permite que um bloco de código (delimitado entre chaves *{}*) seja executado se uma determinada condição for verdadeira.</Text>

<Code exec>
  se (verdadeiro) {
    escreva('sim')
  }

  // Resultado: sim
</Code>

Caso a condição não seja verdadeira o bloco de código do *se* não será executado.

<Code exec>
  se (falso) {
    escreva('sim')
  }

  // Resultado: Sem resultado
</Code>

É possível inserir na condição (que está entre parênteses) do *se* qualquer expressão que resulte em um valor do tipo *lógico*.

<Code exec>
  se (4 > 2) {
    escreva('sim')
  }

  se (5 == 5) {
    escreva('sim')
  }

  se (verdadeiro ou falso) {
    escreva('sim')
  }

</Code>

#### Senao

Se a condição do bloco do *se* não for verdadeira, escrevendo *senao*, é possível inserir um segundo bloco de código que será executado imediatamente caso isso ocorra.

<Code exec>
  var temperatura = 25

  se (temperatura > 30) {
    escreva("Tá muito quente aqui!")
  } senao {
    escreva("Até que o clima tá bom.")
  }

  // Resultado: Até que o clima tá bom.
</Code>

<Alert>Obs.: Só é possível insirir apenas um bloco *se* e um bloco *senao* por estrutura condicional.</Alert>

Logo, escrever dessa maneira é errado.

<Code exec>
  se (verdadeiro) {
    escreva(1)
  } se (falso) { // ❌
    escreva(2)
  } senao {
    escreva(3)
  }

se (verdadeiro) {
    escreva(1)
  } senao { 
    escreva(2)
  } senao { // ❌
    escreva(3)
  }

  // Resultado: Código inválido
</Code>

#### Senao Se 

Para contornar isso é possível inserir outras condições escrevendo *senao se*. Caso a condição do *se* não seja verdadeira, a condição de execução do bloco de código do *senao se* será verificada.

<Code exec>
  var pontuacao = 85

  se (pontuacao <= 50) {
    escreva("Podia ser melhor, né?")
  } senao se (pontuacao <= 90) {
    escreva("Excelente!")
  }

  // Resultado: Excelente!
</Code>

<Alert>Dessa forma é possível inserir múltiplos blocos de código com condicionais, em que, se a condição do bloco anterior não for verdadeira, o próximo bloco será verificado e assim sucessivamente.</Alert>

<Code exec>
  var animal = "cachorro"

  se (animal == "gato") {
      escreva("Miau!")
  } senao se (animal == "cachorro") {
      escreva("Au Au!")
  } senao se (animal == "elefante") {
      escreva("Tromba!")
  } senao {
      escreva("Não sei qual som esse animal faz.")
  }

  // Resultado: Au Au!
</Code>

<Alert>Nesse caso, o bloco do *se* deve sempre ficar no topo e bloco do *senao* deve sempre ficar como último bloco</Alert>

### Escolha Caso

<Text>É uma outra estrutura condicional que permite de forma eficiente encadear várias condições quando a comparação envolve uma variável e uma lista de valores possíveis.</Text>

Para escreve-la, primeiro é preciso escrever a palavra-chave *escolha* inserir entre seus parênteses um valor que será comparado a cada *caso*. Depois, escrever palavra-chave *caso*, o valor a ser comparado e o seu bloco de código. 

No início da *escolha*, o valor é comparado ao valor de cada expressão *caso*. Se os valores foram iguais, o bloco de código do *caso* em questão é executado.

<Code exec>
  var numero = 3

  escolha (numero) {
    caso 1:
      escreva("O número é o 1")
    caso 2:
      escreva("O número é o 2")
    caso 3:
      escreva("O número é o 3")
  }

  // Resultado: O número é o 3
</Code>

Sempre no final da estrutura é possível inserir um bloco *padrao* (sendo opcional) que será sempre executado quando nenhum *caso* for verdadeiro.

<Code exec>
var cor = "roxo"

escolha (cor) {
    caso "vermelho":
      escreva("O carro é vermelho, então é rápido!")
    caso "azul":
      escreva("O carro é azul, então é confiável!")
    caso "verde":
      escreva("O carro é verde, então é ecologicamente correto!")
    padrao:
      escreva("Desculpe, eu só conheço carros vermelhos, azuis e verdes.")
}

  // Resultado: Desculpe, eu só conheço carros vermelhos, azuis e verdes.
</Code>

<Alert>Dois ou mais *casos* podem ter o mesmo bloco de código.</Alert>

<Code exec>
  var alimento = "maçã"

  escolha (alimento) {
    caso "laranja":
    caso "uva":
    caso "maçã":
        escreva("Isso é uma fruta!")
    caso "brócolis":
    caso "espinafre":
        escreva("Isso é um legume!")
    caso "peixe":
        escreva("Isso é peixe!")
    padrao:
        escreva("Alimento desconhecido")
  }
</Code>

<Code exec>
  var idade = 20
  var temCarteira = verdadeiro

  se (idade >= 18) {
    escreva("Você tem idade suficiente para dirigir.")
    
    se (temCarteira) {
        escreva("Você tem carteira de motorista, então você pode dirigir.")
    } senao {
        escreva("Você não tem carteira de motorista, então você não pode dirigir.")
    }
  } senao {
      escreva("Você não tem idade suficiente para dirigir.")
  }

  /* Resultado:
    Você tem idade suficiente para dirigir.
    Você tem carteira de motorista, então você pode dirigir.
  */
</Code>

<Code exec>
  var dia = 'quarta'
  var hora = 15

  escolha (dia) {
    caso 'segunda':
    caso 'terça':
    caso 'quarta':
    caso 'quinta':
        se (hora < 12) {
            escreva('Bom dia!')
        } senao {
            escreva('Boa tarde!')
        }
    caso 'sexta':
        escreva('Hoje é SEXTAAAA!!!!')
    padrao:
        escreva('Dia da semana inválido.')
  }

  // Resultado: Boa tarde!
</Code>

### Escopo de Variável

<Text>Se uma variável for definida dentro de um bloco de código, ela só estará disponível dentro desse bloco, ou seja, ela terá um *escopo local*.</Text>

<Code exec>

se (falso) {
  var x = 1
  escreva(x) // 1
}

escreva(x) 

// Resultado: variável não definida: 'x'.
</Code>

Porém uma variável estará diponível no bloco de código que for definido dentro do bloco em que essa variável foi definida.


<Code exec>
se (verdadeiro) {
  var x = 1
  escreva(x) // 1

  se (verdadeiro) {
    escreva(x) // 1
  }
}


// Resultado: variável não definida
</Code>

A variável poderá ser acessada em qualquer bloco de código se ela for definida fora de qualquer outro bloco, nesse caso ela terá *escopo global*.

<Code exec>
  var x = 1

  se (falso) {
    escreva(x) // 1
  }

  escreva(x) // 1
</Code>
