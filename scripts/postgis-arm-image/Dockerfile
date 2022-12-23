FROM kartoza/postgis:14-3.2

# The official postgis docker repo doesn't publish an ARM64 image. The x86 image is buggy on
# M1 Macs. kartoza/postgis is a production-ready build of postgis that includes an ARM64 image,
# but it comes with security settings that break our local dev environment (specifially
# authenticating the supabase realtime listener). I couldn't figure out how to fix the auth
# issue without stomping these configs in pg_hba.conf, so here's a hacked version of the image.
#
# This is published to jasonprado/kartoza-postgis-unauthenticated as well.

RUN sed -i 's/peer/trust/g' /etc/postgresql/14/main/pg_hba.conf
RUN sed -i 's/peer/trust/g' /etc/postgresql/14/main/pg_hba.conf.template
RUN sed -i 's/scram-sha-256/trust/g' /etc/postgresql/14/main/pg_hba.conf
RUN sed -i 's/scram-sha-256/trust/g' /etc/postgresql/14/main/pg_hba.conf.template
