import React, { useState, useEffect, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../services/api";

import { Title, Form, Women, Error } from "./style";

interface Woman {
  id: string;
  description: string;
  order: number;
  title: string;
  metadata?: {
    birthdate: string;
    deathdate: string;
    country: string;
    credits: string;
    image?: {
      url: string;
    };
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [women, setWomen] = useState(() => {
    const storagedWomen = localStorage.getItem("@githubEx:women");

    if (storagedWomen) {
      return JSON.parse(storagedWomen);
    }

    return [];
  });
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    api.get(`/.json`).then((response) => {
      const womenFormatted = response.data.content.map((woman: Woman) => ({
        ...woman,
        id: woman.id,
        description: woman.description,
        order: woman.order,
        title: woman.title,
        metadata: woman.metadata,
      }));

      console.log(womenFormatted);

      setWomen(womenFormatted);
    });

    console.log(women);

    localStorage.setItem("@githubExplorer:women", JSON.stringify(women));
  }, []);

  return (
    <>
      <Title>Conheça a história de mulheres inspiradoras</Title>

      <Form hasError={!!inputError}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite aqui."
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Women>
        {women.map((woman: Woman) => (
          <Link key={woman.id} to={`/women/${woman.order}`}>
            <img
              src={
                woman.metadata && woman.metadata.image
                  ? woman.metadata.image.url
                  : "https://github.com/account"
              }
              alt={woman.title}
            />
            <div>
              <strong>{woman.title}</strong>
            </div>

            <FiChevronRight size={18} />
          </Link>
        ))}
      </Women>
    </>
  );
};

export default Dashboard;
