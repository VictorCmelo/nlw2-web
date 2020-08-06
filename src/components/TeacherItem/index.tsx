import React from "react";

import "./styles.css";

import whastappIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

export interface Teacher {
  id: number;
  avatar: string;
  subject: string;
  cost: number;
  name: string;
  whatsapp: string;
  bio: string;
}

 interface TeachersItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeachersItemProps> = ({ teacher }) => {

  function createNewConnection() {
    api.post('/connections', {
      user_id : teacher.id,
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />

        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R${teacher.cost}</strong>
        </p>
        <a onClick={createNewConnection} target="_blank" href={`https://wa.me/${teacher.whatsapp}`} >
          <img src={whastappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
