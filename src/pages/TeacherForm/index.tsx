import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";

import { useHistory } from 'react-router-dom';

import "./styles.css";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warnigIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";

function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  // const [name, setName] = useState('');
  // const [name, setName] = useState('');
  // const [name, setName] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function setSheduleItemValue(position: number, field: string, value: string) {
    const updetedScheduleItens = scheduleItems.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setScheduleItems(updetedScheduleItens);
  }

  function handlesubmit(e: FormEvent) {
    e.preventDefault();

    api
      .post("/classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro Realizado com sucesso");

        history.push('/')
      })
      .catch((err) => {
        alert("deu ruim...");
        console.log(err);
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aula"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handlesubmit}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Física", label: "Física" },
                { value: "Matemática", label: "Matemática" },
                { value: "Português", label: "Português" },
                { value: "Quimica", label: "Quimica" },
                { value: "Geografia", label: "Geografia" },
                { value: "História", label: "História" },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((item, index) => {
              return (
                <div key={item.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da Semana"
                    value={item.week_day}
                    onChange={(e) =>
                      setSheduleItemValue(index, "week_day", e.target.value)
                    }
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda-feira" },
                      { value: "2", label: "Terça-feira" },
                      { value: "3", label: "Quarta-feira" },
                      { value: "4", label: "Quita-feira" },
                      { value: "5", label: "Sexta-feira" },
                      { value: "6", label: "Sábado" },
                    ]}
                  />

                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={item.from}
                    onChange={(e) =>
                      setSheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={item.to}
                    onChange={(e) =>
                      setSheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warnigIcon} alt="aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
