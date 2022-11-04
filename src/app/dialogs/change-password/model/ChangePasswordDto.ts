export class ChangePasswordDto{
  newPassword: String;
  confirmPassword: String;

  constructor(newPassword: String, confirmPassword: String) {
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
