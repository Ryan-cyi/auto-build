const child_process = require('child_process')

async function archive(filePath) {
    const name = filePath.trim()
    return new Promise((resolve, reject) => {
        const spawnEvent = child_process.spawn('sh', [name]);
        spawnEvent.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        spawnEvent.stderr.on('data', (data) => {
            console.log(`${data}`);
        });
        spawnEvent.on('close', (code) => {
            if (code === 0) {
                resolve(` build success!`);
            } else {
                reject(new Error(` build failed!`));
            }
        });
    });
}

function execute(cmd) {
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function get_file_path(file_path) {
    return await execute(`ls ${file_path}`);
}


async function execute_bash(params = []) {
    return new Promise((resolve, reject) => {
        const spawnEvent = child_process.spawn('sh', params);
        spawnEvent.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        spawnEvent.stderr.on('data', (data) => {
            console.log(`${data}`);
        });

        spawnEvent.on('close', (code) => {
            if (code === 0) {
                resolve(`${params[0]} execute success!`);
            } else {
                reject(new Error(`${params[0]} execute failed!`));
            }
        });
    });
}

module.exports = {
    execute,
    archive,
    get_file_path,
    execute_bash
}