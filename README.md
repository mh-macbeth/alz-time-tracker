# alz-time-tracker

spring-boot/AngularJs forntend for alirizasaral/timetracker (https://hub.docker.com/r/alirizasaral/timetracker/)

## prerequisities

- Java 1.8 with set JAVA_HOME variable
- docker

_Important note: If you plan to change the URL of the backend (alirizasaral/timetracker), then change accordingly the forwardUrl property located in application.properties._ 

	/src/main/resources/application.properties # forwardUrl=http://192.168.99.100:8080/records

## build

run(in this directory):

	$ mvnw clean package
	$ docker build --file=Dockerfile --tag=mh-macbeth/time-tracker:latest --rm=true .
	
## deploy

run:

	$ docker run -d -p 8080:8080 alirizasaral/timetracker:1
	$ docker run -d -p 8081:8080 mh-macbeth/time-tracker:latest
	
browse:

	http://192.168.99.100:8081/