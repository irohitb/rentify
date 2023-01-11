alter table "public"."user" drop constraint "user_mobile_number_key";
alter table "public"."user" add constraint "user_mobile_number_key" unique ("mobile_number");
