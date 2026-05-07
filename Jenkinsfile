pipeline {
    agent any

    environment {
        PROJECT_NAME = "myapp"
    }

    stages {

        stage('Cleanup') {
            steps {
                sh """
                echo "Stopping old containers..."
                docker-compose -p ${PROJECT_NAME} down --remove-orphans || true
                """
            }
        }

        stage('Build') {
            steps {
                sh """
                echo "Building images..."
                docker-compose -p ${PROJECT_NAME} build
                """
            }
        }

        stage('Start for Test') {
            steps {
                sh """
                echo "Starting containers..."
                docker-compose -p ${PROJECT_NAME} up -d --build
                sleep 10
                """
            }
        }

        stage('Test') {
            steps {
                sh """
                echo "Running health check..."
                curl -f http://localhost || exit 1
                """
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh """
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    docker push rohini1204/web-frontend
                    docker push rohini1204/api-backend
                    """
                }
            }
        }

        stage('Deploy (Clean Restart)') {
            steps {
                sh """
                echo "Final deployment restart..."

                docker-compose -p ${PROJECT_NAME} down --remove-orphans || true
                docker-compose -p ${PROJECT_NAME} pull
                docker-compose -p ${PROJECT_NAME} up -d --build
                """
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline executed successfully!'
        }

        failure {
            sh """
            echo "Fetching logs..."
            docker-compose logs || true
            """
            echo 'Pipeline failed!'
        }
    }
}
