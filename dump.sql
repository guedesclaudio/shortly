--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: usersLinks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."usersLinks" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "linkId" integer NOT NULL
);


--
-- Name: usersLinks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."usersLinks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usersLinks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."usersLinks_id_seq" OWNED BY public."usersLinks".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usersLinks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersLinks" ALTER COLUMN id SET DEFAULT nextval('public."usersLinks_id_seq"'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES (8, 'https://www.driven.com.br/', 'dvUzcXIj', 8, '2022-10-13 12:58:42.720033');
INSERT INTO public.links VALUES (10, 'hhhhhhhhhhttps://www.driven.com.br/', 'wjKNUVfz', 2, '2022-10-13 13:01:36.987575');
INSERT INTO public.links VALUES (11, 'https://www.google.com', 'J5ZbOtsy', 2, '2022-10-13 14:53:01.719929');
INSERT INTO public.links VALUES (12, 'https://www.youtube.com', 'YrlcFAEI', 0, '2022-10-15 16:27:47.296746');
INSERT INTO public.links VALUES (13, 'https://www.youtube.com', '1qagviIS', 0, '2022-10-15 16:28:13.761182');
INSERT INTO public.links VALUES (14, 'https://www.youtube.com', 'n1Z4KVeJ', 0, '2022-10-15 16:28:34.033197');
INSERT INTO public.links VALUES (19, 'https://www.google.com', '46YXT-sz', 1, '2022-10-15 17:20:52.950151');
INSERT INTO public.links VALUES (20, 'https://www.google.com', 'uq5QZwy5', 16, '2022-10-15 17:33:23.899522');
INSERT INTO public.links VALUES (21, 'https://www.driven.com.br', 'BFy7BFUs', 0, '2022-10-17 12:07:44.971786');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (5, 3, 'ff2cc5a8-4e00-44dd-ba1d-5872622d04a3', '2022-10-13 12:47:38.643883');
INSERT INTO public.sessions VALUES (6, 1, '59b06eac-9143-49e2-943a-730b490e65e2', '2022-10-13 14:51:00.124472');
INSERT INTO public.sessions VALUES (7, 5, '41210c7a-6435-465a-b06e-4acda071537f', '2022-10-15 15:35:53.097891');
INSERT INTO public.sessions VALUES (8, 6, '615a966d-43dd-4f37-ad8f-139cb945b45a', '2022-10-17 12:06:34.796379');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$EH26oZt8muj/aeDfhGno3O1YKWpR1nvQwC4z3yLruy57UMGocvmfS', '2022-10-11 14:49:08.833765');
INSERT INTO public.users VALUES (2, 'Claudio', 'cgsarmentosilva@gmail.com', '$2b$10$mJPAVTVw3gZ0qnu4xtZGseH7bjX.1zXI3Z3k9fX5lc.KlyozQ5ISi', '2022-10-12 16:23:10.903692');
INSERT INTO public.users VALUES (3, 'Teste', 'teste@gmail.com', '$2b$10$LKNo1yfsgIQbN/lIAbXzCuslYKFi8Ib5aOBkx6NkSS.dRntc8lOUq', '2022-10-13 12:43:06.30342');
INSERT INTO public.users VALUES (4, 'joao', 'email@email.com', '$2b$10$YFrI8ivUmIJ6MEoKxhrNVOd6ESo6G8fW3fKNjfg1DOWFdJEWApIBK', '2022-10-15 15:01:06.453331');
INSERT INTO public.users VALUES (5, 'email', 'email2@email.com', '$2b$10$.TjRTFJj.rV.rbleIb4fu.9dFpfrZNzoYEWqL1Vg.M6tVBU4Z/Eke', '2022-10-15 15:10:27.245179');
INSERT INTO public.users VALUES (6, 'zero', 'zero@driven.com.br', '$2b$10$YlCKNehBw51hk/Mw01f9huyo4DPV0pceH8nsIZA5/7FCI8joa4pa6', '2022-10-17 12:03:31.474986');
INSERT INTO public.users VALUES (7, 'maisum', 'maisum@driven.com.br', '$2b$10$8/cOCPMGLh3H2l1htwNLeOV4gESKB5TlHHwLHlRzj6kTT9SN8t6pe', '2022-10-17 12:32:49.332819');


--
-- Data for Name: usersLinks; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."usersLinks" VALUES (7, 3, 8);
INSERT INTO public."usersLinks" VALUES (9, 3, 10);
INSERT INTO public."usersLinks" VALUES (10, 1, 11);
INSERT INTO public."usersLinks" VALUES (15, 5, 19);
INSERT INTO public."usersLinks" VALUES (16, 5, 20);
INSERT INTO public."usersLinks" VALUES (17, 6, 21);


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 21, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 8, true);


--
-- Name: usersLinks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."usersLinks_id_seq"', 17, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: usersLinks usersLinks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersLinks"
    ADD CONSTRAINT "usersLinks_pkey" PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: usersLinks usersLinks_linkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersLinks"
    ADD CONSTRAINT "usersLinks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES public.links(id);


--
-- Name: usersLinks usersLinks_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersLinks"
    ADD CONSTRAINT "usersLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

