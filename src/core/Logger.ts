export class Logger {

  static log(message: string) {
    message = this.concatTime(message)
    console.log(message)
  };

  static error(message: string) {
    message = this.concatTime(message)
    console.error(message)
  };

  static warn(message: string) {
    message = this.concatTime(message)
    console.warn(message)
  };

  private static concatTime(message: string) {
    const time = new Date().toISOString();
    return time + ': ' + message
  }

}