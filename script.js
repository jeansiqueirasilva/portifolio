const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector(".menu");
const linksMenu = document.querySelectorAll(".menu a");
const elementosRevelar = document.querySelectorAll(".revelar");
const secoes = document.querySelectorAll("main section[id]");

botaoMenu.addEventListener("click", () => {
  const menuAberto = menu.classList.toggle("aberto");

  botaoMenu.setAttribute("aria-expanded", String(menuAberto));
  document.body.classList.toggle("menu-aberto", menuAberto);
});

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-aberto");
  });
});

const observadorRevelar = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observadorRevelar.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.16 }
);

elementosRevelar.forEach((elemento) => observadorRevelar.observe(elemento));

const observadorMenu = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) {
        return;
      }

      linksMenu.forEach((link) => {
        link.classList.toggle("ativo", link.getAttribute("href") === `#${entrada.target.id}`);
      });
    });
  },
  { rootMargin: "-38% 0px -52% 0px" }
);

secoes.forEach((secao) => observadorMenu.observe(secao));
