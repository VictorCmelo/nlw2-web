import React from "react";

import './styles.css';

import whastappIcon from "../../assets/images/icons/whatsapp.svg";

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars2.githubusercontent.com/u/21694466?s=460&u=625d8412b8e6f222e51a005dffbd67813fe0ffd1&v=4"
          alt="Victor Melo"
        />

        <div>
          <strong>Victor Costa</strong>
          <span>Física</span>
        </div>
      </header>
      <p>
        Engenheiro de Computação e Analista de Dados
        <br /> <br />
        Full Stack Developer em Comando Rodoviário da Brigada Militar
        <br /> <br />
        Apaixonado por tecnologia e eletrônica
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 75,00</strong>
        </p>
        <button type="button">
          <img src={whastappIcon} alt="whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
