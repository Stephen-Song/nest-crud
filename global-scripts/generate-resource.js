const { spawnSync } = require("child_process");
const chalk = require("chalk");

const commandArgs = process.argv.slice(2);
const npmArgs = JSON.parse(process.env.npm_config_argv || "{}");
const interfaceName = commandArgs[0] || npmArgs.original[1];
const generateResourceCommand = `nest g resource ${interfaceName}`;

console.log(
  chalk.blueBright(
    `Generating resource package for interface: ${chalk.red.bold(
      interfaceName
    )}`
  )
);
console.log(`Running command: ${generateResourceCommand}`);

// 运行 nest g resource 命令
const { status } = spawnSync("npx", generateResourceCommand.split(" "), {
  stdio: "inherit",
});

if (status !== 0) {
  console.error(
    `Command "${generateResourceCommand}" failed with status code ${status}`
  );
  process.exit(status);
}
