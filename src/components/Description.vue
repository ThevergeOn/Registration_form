<template>
  <div class="container mx-auto p-4">
    <label for="description">Description:</label>
    <input
      id="description"
      class="w-full p-2 border rounded-md mb-4"
      v-model="text"
      @input="debouncer(() => isBalanced())"
    />
    <p>Message :{{ isBalancedMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      isBalancedMessage: "",
      debouncer: null,
    };
  },
  methods: {
    createDebounce() {
      let timeout = null;
      return function (fnc, delayMs) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fnc();
        }, delayMs || 100);
      };
    },
    isBalanced() {
      const str = this.text;
      const stack = [];
      const bracketMap = {
        "(": ")",
        "[": "]",
        "{": "}",
      };

      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (this.isOpeningBracket(char, bracketMap)) {
          stack.push(char);
        } else if (this.isClosingBracket(char, bracketMap)) {
          const lastOpeningBracket = stack.pop();
          if (bracketMap[lastOpeningBracket] !== char) {
            return (this.isBalancedMessage = "The text is not balanced.");
          }
        }
      }

      return (this.isBalancedMessage =
        stack.length === 0
          ? "The text is balanced."
          : "The text is not balanced.");
    },

    isOpeningBracket(char, bracketMap) {
      return Object.keys(bracketMap).includes(char);
    },

    isClosingBracket(char, bracketMap) {
      return Object.values(bracketMap).includes(char);
    },
  },
  mounted() {
    this.debouncer = this.createDebounce();
  },
};
</script>
