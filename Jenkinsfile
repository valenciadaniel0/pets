pipeline{
	
		agent {
		label 'master'
		}
	
        
		triggers {
        pollSCM('@hourly')
		}
	
		options {
			buildDiscarder(logRotator(numToKeepStr: '5'))
			disableConcurrentBuilds()
		}
		
		stages{
		
			stage('Checkout') {
				steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'personal-github', url: 'https://github.com/valenciadaniel0/pets.git']]])
				}
			}
		
		
			stage('compilar '){
                steps {
                    bat '\\back\\npm i'
                    bat '\\back\\npm run build'					
				}
            }
            stage('test '){
                steps {
                    bat '\\back\\npm run test:cov'					
				}
            }

			
			 stage('Sonar Analysis'){
			 	steps{
			 		echo '------------>Analisis de código estático<------------'
			 		  withSonarQubeEnv('Sonar') {
                         bat "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=co.com.ceiba:pets.daniel.valencia.master -Dsonar.projectName=co.com.ceiba:pets.daniel.valencia.master -Dproject.settings=\\back\\sonar-project.properties"
                      }
			 	}
			 }
		
		

		}
		post {
			failure {
				mail(to: 'daniel.valencia@ceiba.com.co',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}
		}	
			
}