
export default {
  beforeDestroy() {
    this.clearErrors();
    this.clearSuccess();
  },
  data() {
    return {
      error: '',
      errorTimerId: '',
      success: '',
      successTimerId: '',
    }
  },
  methods: {
    showError(msg) {
      this.clearSuccess();
      this.error = msg;
      this.errorTimerId = setTimeout(() => {
        this.error = null;
      }, 6666);
    },
    showSuccess(msg) {
      this.clearErrors();
      this.success = msg || 'Обновлено!';
      this.successTimerId = setTimeout(() => {
        this.success = null;
      }, 6666);
    },
    clearErrors() {
      this.errorTimerId && 
      clearTimeout(this.errorTimerId);
      this.errorTimerId = '';
      this.error = '';
    },
    clearSuccess() {
      this.successTimerId && 
      clearTimeout(this.successTimerId);
      this.successTimerId = '';
      this.success = '';
    },
  },
}
