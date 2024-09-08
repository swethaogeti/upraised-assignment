"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

type Question = {
  question: string;
  options: { id: number; text: string }[];
  answer: number;
  id: string;
};

type Data = Question;

const MainContainer = styled.main`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;
padding: 40px 0;
background: linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%);
background-blend-mode: multiply;
height: 100%;

.heading-container{
  width: 340px;
  height: 316px;
  border-radius: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 8px 8px 0px #0000001A;

  .heading{
  color: #FF3B3C;
  font-family: Poppins;
  font-size: 80px;
  font-weight: 800;
  line-height: 90px;
  text-align: center;

  }
}

.link-btn{
  width: 200px;
  height: 55px;
  background-color: #FF3B3C;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
}
.image-icon{
  width: 291px;
  height: 70px;
}
@media (max-width: 480px) {
  .heading-container {
    width: 200px; 
    height: 180px; 

    .heading{
    font-size: 26px;
  }
  } 
}
`;


const fetchQuestions = async (): Promise<Data[]> => {
  const res = await fetch(process.env.NEXT_PUBLIC_QUESTIONS_PATH as string);
  const data = await res.json();

  return data;
};

export default function Home() {

  const {
    data: questionData,
    isSuccess,
  } = useQuery<Question[], { message: string }>({
    queryKey: ["questionData"],
    queryFn: fetchQuestions,
  });

  return (
    <>
      <Head>
        <title>quizz app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <div className="image-container">
          <Image src='/upraisedIcon.png' alt="upraised image" className='image-icon' width={291} height={70} />
        </div>

        <div className="heading-container">
          <h1 className="heading">Quizz</h1>
        </div>

        {isSuccess ? (
          <Link
            href="/questions/[question]"
            as={`/questions/${questionData[0]?.id}`}
            className="link-btn"
          >
            Start
          </Link>
        ) : (
          ""
        )}

      </MainContainer>
    </>
  );
}

