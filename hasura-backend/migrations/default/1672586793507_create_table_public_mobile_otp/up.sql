CREATE TABLE "public"."mobile_otp" ("id" serial NOT NULL, "user_id" integer NOT NULL, "otp_code" integer NOT NULL, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON UPDATE restrict ON DELETE restrict);