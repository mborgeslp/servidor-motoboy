const buttonAdd = document.querySelector('.buttonAdd');
const buttonChange = document.querySelector('.buttonChange');
const buttonFecharList = document.querySelector('.buttonFecharList');
const btnLimpar = document.querySelector('.btnLimpar');

const selectLoja = document.querySelector('#selectLoja');
const listBairros = document.querySelector('#listBairros');

const vlChegada = document.querySelector('#vlChegada');
const ulList = document.querySelector('#listBairros ul');

const areaList = document.querySelector('.areaList');
const qtdEntregas = document.querySelector('.qtdEntregas');


buttonChange.addEventListener('click', () => {
  selectLoja.disabled = false;
  selectLoja.focus();
  selectLoja.value = ''
  valorChegada('')
  limparTaxas('Mudar')
});

buttonAdd.addEventListener('click', (e) => {
  e.preventDefault();
  const valueLoja = selectLoja.value;
  if (valueLoja === "") {
    alert('Selecione uma loja');
    return;
  }
  if (!listBairros.classList.contains('areaListaShow')) {
    listBairros.classList.add('areaListaShow');
  }

  buscarBairros(valueLoja)
});
buttonFecharList.addEventListener('click', (e) => {
  e.preventDefault();
  if (listBairros.classList.contains('areaListaShow')) {
    listBairros.classList.remove('areaListaShow');
  }

});
chamarLojas()
valorChegada('')


async function chamarLojas() {

  try {
    const res = await fetch('/buscarLojas');

    if (!res.ok) {
      throw new Error(`ERRO HTTP: ${res.status}`);
    }
    const lojas = await res.json();
    lojas.forEach(lj => {
      const option = document.createElement('option');
      option.value = lj.restaurante
      option.textContent = `${lj.restaurante}`
      selectLoja.appendChild(option);
    });

  } catch (err) {
    console.error('Erro ao obter dados!', err);
  }
}
selectLoja.addEventListener('change', () => {


  valorChegada(selectLoja.value)
  selectLoja.disabled = true;
});
async function valorChegada(lj) {
  try {
    const res = await fetch('/buscarLojas');
    if (!res.ok) {
      throw new Error(`ERRO HTTP: ${res.status}`);
    }
    const lojas = await res.json();

    lojas.forEach(dado => {

      let chegada = dado.chegada



      if (lj === '') {
        vlChegada.dataset.valor = 0

        vlChegada.textContent = Number(vlChegada.dataset.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        atualizarTotal();
        return
      }
      if (dado.restaurante == lj) {

        vlChegada.textContent = chegada.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        vlChegada.dataset.valor = chegada
        atualizarTotal();
      }

    });

  } catch (err) {
    console.error('Erro ao buscar dados', err);
  }
}


async function buscarBairros(lj) {
  ulList.innerHTML = '';
  try {
    const res = await fetch('/buscarLojas');
    if (!res.ok) {
      throw new Error(`ERRO HTTP: ${res.status}`);
    }
    const dados = await res.json();

    dados.forEach(loja => {
      if (loja.restaurante == lj) {
        loja.bairros.forEach(bairro => {


          const li = document.createElement('li');

          li.classList = 'itenList'
          li.dataset.nomeBairro = bairro.bairro
          li.dataset.idBairro = bairro.id
          li.dataset.taxa = bairro.taxa

          let taxa = Number(bairro.taxa).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

          li.innerHTML = `
            <div><p>${bairro.bairro}</p></div>
            <div><span>${taxa}</span></div>
            <div><button class="btnAddTaxa">+</button></div>
          `
          ulList.appendChild(li);



        });
      }
    });
  } catch (err) {
    console.error('Erro ao buscar dados: ', err);
  }
}

ulList.addEventListener('click', (e) => {
  const btn = e.target.closest('.btnAddTaxa');
  if (!btn) {
    return
  }

  const li = btn.closest('li');

  const nomeBairro = li.dataset.nomeBairro
  const taxa = Number(li.dataset.taxa)

  const newItemLi = document.createElement('li');
  newItemLi.classList = 'itemBairro'

  newItemLi.dataset.idBairro = li.dataset.idBairro;
  newItemLi.dataset.taxa = li.dataset.taxa


  newItemLi.innerHTML = `
    <div>
      <input class="checkLimpar" type="checkbox">
    </div>
    <div>
      <p>${nomeBairro}</p>
    </div>
    <div>
      <span class="numTx">${taxa.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
    </div>

  `
  if (!document.querySelector('.itemBairro')) {
    document.querySelector('.areaBtnLimpar').classList.remove('hiddenLimpar');
  }

  areaList.appendChild(newItemLi);
  if (listBairros.classList.contains('areaListaShow')) {
    listBairros.classList.remove('areaListaShow');
  }
  atualizarTotal();
});

btnLimpar.addEventListener('click', (e) => {
  e.preventDefault();
  //alert('Clicou');

  limparTaxas('Limpar')

})

function limparTaxas(button) {
  const areaBtnLimpar = document.querySelector('.areaBtnLimpar');
  let selecionados;
  let inputs
  if (button === 'Limpar') {
    inputs = areaList.querySelectorAll('input[type="checkbox"]:checked')
    const verific = areaList.querySelector('input:checked');
    const alertLimpar = areaBtnLimpar.querySelector('span');

    if (!verific) {

      alertLimpar.classList.add('alertLimpar')
      alertLimpar.textContent = 'Selecione pelo menos uma taxa!'
    }

    if (verific) {
      alertLimpar.classList.remove('alertLimpar')
      alertLimpar.textContent = ''
    }
  }
  if (button === 'Mudar') {
    inputs = areaList.querySelectorAll('input[type="checkbox"]')
  }
  selecionados = inputs
  selecionados.forEach(input => {
    const li = input.closest('li');
    if (li) li.remove();
  });

  if (!document.querySelector('.itemBairro')) {
    areaBtnLimpar.classList.add('hiddenLimpar');
  }
  atualizarTotal()
}

function atualizarTotal() {
  const totalTx = document.querySelector('#totalTx');
  const vlTaxas = document.querySelector('#vlTaxas');

  const itens = document.querySelectorAll('.itemBairro');




  const valorChegada = Number(vlChegada.dataset.valor || 0);




  let somaTaxas = 0;
  let total = 0;

  itens.forEach(item => {

    somaTaxas += Number(item.dataset.taxa);

  });

  qtdEntregas.textContent = itens.length
  vlTaxas.textContent = somaTaxas.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  total = valorChegada + somaTaxas

  totalTx.textContent = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

