alter table "public"."user" add constraint "user_mobile_number_user_role_key" unique ("mobile_number", "user_role");
