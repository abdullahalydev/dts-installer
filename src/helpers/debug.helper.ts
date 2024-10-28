export default class DebugHelper {
  private header: string;
  private message: string = "";

  constructor({ header }) {
    this.header = header;
    process.stdout.write("\n");
  }

  public loading({ message }) {
    process.stdout.write("\r");
    process.stdout.write(
      `[ ⌛  ][ ${this.header} ] - ${message}${this.message.slice(message.length).split("").fill(" ").join("")}`,
    );

    this.message = message;
  }

  public success({ message }) {
    process.stdout.write("\r");
    process.stdout.write(
      `[ ✅  ][ ${this.header} ] - ${message}${this.message.slice(message.length).split("").fill(" ").join("")}`,
    );

    this.message = message;
  }

  public failure({ message }) {
    process.stdout.write("\r");
    process.stdout.write(
      `[ ❌  ][ ${this.header} ] - ${message}${this.message.slice(message.length).split("").fill(" ").join("")}`,
    );

    this.message = message;
  }

  public information({ message }) {
    process.stdout.write("\r");
    process.stdout.write(
      `[ ❓  ][ ${this.header} ] - ${message}${this.message.slice(message.length).split("").fill(" ").join("")}`,
    );

    this.message = message;
  }

  public line() {
    process.stdout.write("\n");
  }
}
