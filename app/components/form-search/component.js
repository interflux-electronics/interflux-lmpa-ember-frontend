import FormFieldComponent from '../form-field/component';
import EmberObject, { computed } from '@ember/object';
import { and, not } from '@ember/object/computed';
import { sort } from '@ember/object/computed';
import { htmlSafe } from '@ember/template';

export default FormFieldComponent.extend({
  classNames: ['form-search', 'form-input'],
  classNameBindings: [
    'hasOptions:has-options:no-options',
    'hasFocus:has-focus:no-focus',
    'hasInput:has-input:no-input',
    'showDropdown:show-dropdown:hide-dropdown'
  ],

  attributeBindings: ['disabled'],

  // Passed in
  label: undefined,
  placeholder: undefined,
  options: undefined,
  onSelect: undefined,
  searchKey: undefined,

  // Whether the passed in array of options has at least 1 item.
  hasOptions: computed('options', function() {
    return this.options && this.options.length;
  }),

  // Sort countries by population size to avoid small island
  // nations to appear above large countries.
  sortedOptions: sort('options', function(a, b) {
    if (a.population > b.population) {
      return 1;
    } else if (a.population < b.population) {
      return -1;
    }
    return 0;
  }),

  // In case no options were passed in, then disabled the form field.
  disabled: not('hasOptions'),

  // Whether user is currently focused on the <input>
  hasFocus: false,

  // Whether user typed at least 1 letter in the <input>
  hasInput: computed('userSearch', function() {
    return this.userSearch && this.userSearch.length;
  }),

  // Show the dropdown if <input> has focus and at least 1 letter
  showDropdown: and('hasFocus', 'hasInput'),

  // The letters the user is searching for
  userSearch: undefined,

  // All options that match the search query
  matches: computed('userSearch', function() {
    if (!this.hasOptions || !this.hasInput) {
      return;
    }
    const userSearch = this.userSearch;
    const matches = [];
    this.sortedOptions.forEach(option => {
      const string = option[this.searchKey];
      const regex = new RegExp(userSearch, 'gi');
      const split1 = string.split(regex);
      const split2 = string.match(regex);
      const isMatch = split1 && split1.length > 1;
      if (isMatch) {
        let html = '';
        for (let i = 0; i < split1.length; i++) {
          html += split1[i];
          html += split2[i] ? `<strong>${split2[i]}</strong>` : '';
          html = htmlSafe(html);
        }
        const match = EmberObject.create({
          option,
          string,
          html
        });
        matches.push(match);
      }
    });
    return matches.sortBy('population').reverse();
  }),

  actions: {
    _onFocus(event) {
      this.set('hasFocus', true);
      this.onFocusIn(event);
    },
    _onBlur() {
      // TODO: Impedes onclickItem closure...
      // this.set('hasFocus', false);
      // this.onFocusOut(event);
    },
    _onInput(userSearch) {
      this.set('userSearch', userSearch);
    },
    _onClickItem(match) {
      this.set('value', match.option[this.searchKey]);
      this.set('userSearch', match.option[this.searchKey]);
      this.onSelect(match.option);
      this.set('hasFocus', false);
    },
    _onEnter() {
      // TODO: Select the one in focus
    }
  }
});
