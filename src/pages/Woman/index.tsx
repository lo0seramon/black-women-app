import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import ReactHtmlParser from "react-html-parser";

import api from "../../services/api";

import { Header, WomanInfo, Descriptions } from "./style";

interface WomanParams {
  woman: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

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

const Woman: React.FC = () => {
  const [woman, setWoman] = useState<Woman | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<WomanParams>();

  console.log(params.woman)

  useEffect(() => {
    api.get(`content/${params.woman}.json`).then((response) => {
      console.log(params.woman);
      console.log(response.data);
      setWoman(response.data);
    });
  }, [params.woman]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {woman && (
        <>
          <WomanInfo>
            <header>
              <img
                src={
                  woman.metadata && woman.metadata.image
                    ? woman.metadata?.image.url
                    : "https://avatars.githubusercontent.com/u/11614614?s=460&u=2f0184fff3f6e5d69d48eeb4a1a90cc30fd5d5bc&v=4"
                }
                alt={woman.title}
              />
              <div>
                <strong>{woman.title}</strong>
              </div>
            </header>
            <ul>
              <li>
                <strong>{woman.id}</strong>
                <span>País</span>
              </li>
              <li>
                <strong>{woman.id}</strong>
                <span>Data de Nascimento</span>
              </li>
              <li>
                <strong>{woman.id}</strong>
                <span>Data de Morte</span>
              </li>
            </ul>
          </WomanInfo>

          <Descriptions>
            <section>
              <div>{ReactHtmlParser(woman.description)}</div>
            </section>
          </Descriptions>
        </>
      )}
    </>
  );
};

export default Woman;
