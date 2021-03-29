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
        child_process.exec(cmd, (error, stdout, stderr) => {
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

module.exports = {
    execute,
    archive,
    get_file_path
}