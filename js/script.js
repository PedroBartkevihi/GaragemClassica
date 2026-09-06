(function(){
	"use strict";

	var header = document.querySelector("header");
	var toggle = document.querySelector(".mobile");
	var menu = document.querySelector("#menu");
	var linksMenu = document.querySelectorAll("#menu a");


	function abreMenu(){
		menu.classList.add("aberto");
		toggle.classList.add("ativo");
		toggle.setAttribute("aria-expanded", "true");
		toggle.setAttribute("aria-label", "Fechar menu");
	}

	function fechaMenu(){
		menu.classList.remove("aberto");
		toggle.classList.remove("ativo");
		toggle.setAttribute("aria-expanded", "false");
		toggle.setAttribute("aria-label", "Abrir menu");
	}

	if(toggle && menu){
		toggle.addEventListener("click", function(){
			if(menu.classList.contains("aberto")){
				fechaMenu();
			}else{
				abreMenu();
			}
		});

		linksMenu.forEach(function(link){
			link.addEventListener("click", fechaMenu);
		});

		document.addEventListener("keydown", function(e){
			if(e.key === "Escape"){
				fechaMenu();
			}
		});

		document.addEventListener("click", function(e){
			if(!menu.contains(e.target) && !toggle.contains(e.target)){
				fechaMenu();
			}
		});

		window.addEventListener("resize", function(){
			if(window.innerWidth > 900){
				fechaMenu();
			}
		});
	}


	function atualizaHeader(){
		if(window.scrollY > 8){
			header.classList.add("rolagem");
		}else{
			header.classList.remove("rolagem");
		}
	}

	if(header){
		atualizaHeader();
		window.addEventListener("scroll", atualizaHeader, { passive: true });
	}


	var alvos = document.querySelectorAll("[data-revelar]");
	var semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	function revelaTudo(){
		alvos.forEach(function(el){ el.classList.add("visivel"); });
	}

	if(alvos.length){
		if(semAnimacao || !("IntersectionObserver" in window)){
			revelaTudo();
		}else{
			try{
				var observador = new IntersectionObserver(function(entradas){
					entradas.forEach(function(entrada){
						if(entrada.isIntersecting){
							entrada.target.classList.add("visivel");
							observador.unobserve(entrada.target);
						}
					});
				}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

				alvos.forEach(function(el){ observador.observe(el); });

				setTimeout(revelaTudo, 4000);
			}catch(erro){
				revelaTudo();
			}
		}
	}


	var form = document.querySelector("section.contato form");

	if(form){
		form.addEventListener("submit", function(e){
			e.preventDefault();
			form.innerHTML = '<p class="form-ok">Recebemos sua mensagem. Em breve entramos em contato!</p>';
		});
	}


	var carrossel = document.querySelector("[data-carrossel]");

	if(carrossel){
		var frases = carrossel.querySelectorAll("blockquote");
		var nomes = carrossel.querySelectorAll(".nome-depoimento");
		var atual = 0;

		function mostraDepoimento(indice){
			atual = (indice + frases.length) % frases.length;
			frases.forEach(function(el, i){ el.hidden = (i !== atual); });
			nomes.forEach(function(el, i){ el.hidden = (i !== atual); });
		}

		var anterior = carrossel.querySelector(".arrow-prev");
		var proximo = carrossel.querySelector(".arrow-next");

		if(anterior && proximo){
			anterior.addEventListener("click", function(){ mostraDepoimento(atual - 1); });
			proximo.addEventListener("click", function(){ mostraDepoimento(atual + 1); });
		}
	}


	var vitrineVenda = document.querySelector(".vitrine-venda");

	if(vitrineVenda){
		var precoMax = document.querySelector("#preco-max");
		var precoLabel = document.querySelector("#preco-label");
		var decadas = document.querySelectorAll("input[name=decada]");
		var carros = vitrineVenda.querySelectorAll(".vitrine-destaque");
		var semResultado = vitrineVenda.querySelector(".sem-resultado");

		function decadaSelecionada(){
			var marcado = document.querySelector("input[name=decada]:checked");
			return marcado ? marcado.value : "todas";
		}

		function filtra(){
			var limite = parseInt(precoMax.value, 10);
			var decada = decadaSelecionada();
			var visiveis = 0;

			carros.forEach(function(carro){
				var preco = parseInt(carro.getAttribute("data-preco"), 10);
				var ano = parseInt(carro.getAttribute("data-ano"), 10);
				var passaPreco = preco <= limite;
				var passaDecada = decada === "todas" || (ano >= parseInt(decada, 10) && ano <= parseInt(decada, 10) + 9);

				if(passaPreco && passaDecada){
					carro.hidden = false;
					visiveis++;
				}else{
					carro.hidden = true;
				}
			});

			if(semResultado){
				semResultado.hidden = visiveis > 0;
			}
		}

		if(precoMax && precoLabel){
			precoMax.addEventListener("input", function(){
				precoLabel.textContent = "R$ " + parseInt(precoMax.value, 10).toLocaleString("pt-BR");
				filtra();
			});
		}

		decadas.forEach(function(radio){
			radio.addEventListener("change", filtra);
		});

		filtra();
	}


	var fotoDestaque = document.querySelector("#foto-destaque");

	if(fotoDestaque){
		var miniaturas = document.querySelectorAll(".mini-img");
		var faixa = document.querySelector(".nav-galeria-wraper");
		var janela = document.querySelector(".nav-galeria");
		var deslocamento = 0;

		function ativaMiniatura(alvo){
			miniaturas.forEach(function(m){ m.classList.remove("ativo"); });
			alvo.classList.add("ativo");
			fotoDestaque.src = alvo.src;
			fotoDestaque.alt = alvo.alt;
		}

		miniaturas.forEach(function(m){
			m.addEventListener("click", function(){ ativaMiniatura(m); });
		});

		if(miniaturas.length){
			ativaMiniatura(miniaturas[0]);
		}

		function passo(){
			if(miniaturas.length < 2) return 0;
			return miniaturas[1].parentElement.offsetLeft - miniaturas[0].parentElement.offsetLeft;
		}

		function limite(){
			return Math.max(0, faixa.scrollWidth - janela.clientWidth);
		}

		function move(direcao){
			deslocamento = Math.min(Math.max(0, deslocamento + direcao * passo()), limite());
			faixa.style.transform = "translateX(-" + deslocamento + "px)";
		}

		var setaEsq = document.querySelector(".arrow-left-nav");
		var setaDir = document.querySelector(".arrow-right-nav");

		if(setaEsq && setaDir){
			setaEsq.addEventListener("click", function(){ move(-1); });
			setaDir.addEventListener("click", function(){ move(1); });
			window.addEventListener("resize", function(){
				deslocamento = 0;
				faixa.style.transform = "translateX(0)";
			});
		}
	}

})();
