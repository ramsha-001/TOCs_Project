pipeline {
    agent any

    stages {
        stage('Deploy HTML, CSS, and JS') {
            steps {
                sshagent(['Apache']) {
                    script {
                        echo 'Deploying web files to the remote Apache server...'

                        // Automatically add the server's SSH key to known_hosts
                        sh '''
                        mkdir -p ~/.ssh
                        ssh-keyscan -H ip-172-31-30-70 >> ~/.ssh/known_hosts
                        chmod 644 ~/.ssh/known_hosts
                        '''

                        // Copy the files to the remote server
                        sh '''
                        scp index.html script.js style.css ubuntu@ip-172-31-30-70:/var/www/html/
                        '''
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo 'Verifying deployment of web files on the remote server...'

                    // Check if index.html is accessible
                    sh 'curl http://ip-172-31-30-70/index.html'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment of web files completed successfully!'
        }
        failure {
            echo 'Deployment failed. Check the logs for more details.'
        }
    }
}
