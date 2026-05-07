pipeline {
    agent any

    stages {

        stage('Cleanup') {
            steps {
                sh 'docker-compose down || true'
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Test') {
            steps {
                sh 'docker-compose up -d'
                sh 'sleep 10'
                sh 'curl -f http://localhost || exit 1'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    docker push rohini1204/web-frontend
                    docker push rohini1204/api-backend
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose pull'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline executed successfully!'
        }

        failure {
            sh 'docker-compose logs'
            echo 'Pipeline failed!'
        }
    }
}  
