CREATE TABLE "engagements" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "engagements_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"contentId" integer NOT NULL,
	"likes" integer DEFAULT 0,
	"claps" integer DEFAULT 0
);
