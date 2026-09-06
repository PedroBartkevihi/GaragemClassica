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

})();
