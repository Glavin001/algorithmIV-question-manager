    /**
     * ---------------------------------------------
     * Public Method (prettify.setConfig)
     * ---------------------------------------------
     * @desc Sets the config settings for the prettifier.
     * @param {Object<string, (number|boolean)>} newConfig - The config
     *   settings for the prettifier.
     * @private
     */
    prettify.setConfig = function(newConfig) {

      prettify.debug.start('setConfig', newConfig);
      prettify.debug.args('setConfig', newConfig, 'object');

      config = newConfig;
      Object.freeze(config);
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLines)
     * ---------------------------------------------
     * @desc Standardizes all line breaks and replaces tabs with spaces.
     * @param {string} solution - The problem's solution to be formatted.
     * @return {strings}
     * @private
     */
    function prepareLines(solution) {

      prettify.debug.group('init', 'coll', 'Open to see original string');
      prettify.debug.start('prepareLines', solution);
      prettify.debug.group('init', 'end');
      prettify.debug.args('prepareLines', solution, 'string');

      /** @type {string} */
      var spaces;
      /** @type {number} */
      var spaceCount;

      // Standardize all line breaks
      solution = solution.replace(/\r\n?/g, '\n');

      // Replace all tabs with spaces
      spaces = '';
      spaceCount = config.tabLength;
      while (spaceCount--) {
        spaces += ' ';
      }
      if (spaces) {
        solution = solution.replace(/\t/g, '  ');
      }

      return solution.split('\n');
    }

    /**
     * ---------------------------------------------
     * Private Method (applyFormatting)
     * ---------------------------------------------
     * @desc Applies the prettifier formats.
     * @param {strings} lines - An array of code lines.
     * @return {{
     *   result   : string,
     *   lineCount: number
     * }}
     * @private
     */
    function applyFormatting(lines) {

      var debugMsg;
      prettify.debug.start('applyFormatting', lines);
      prettify.debug.args('applyFormatting', lines, 'strings');

      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {} */
      var line;

      commentOpen = false;
      len = lines.length;

      i = -1;
      while (++i < len) {

        debugMsg = 'lineNumber= $$';
        prettify.debug.group('applyFormatting', 'coll', debugMsg, (i + 1));

        line = prepareLine(lines[i]);

        if (line) {
          line = highlightSyntax(line, i);
        }

        lines[i] = '<li>'+ line +'</li>';

        prettify.debug.state('applyFormatting', 'lineOutput= $$', lines[i]);
        prettify.debug.group('applyFormatting', 'end');
      }

      return {
        result   : lines.join(''),
        lineCount: len
      };
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLine)
     * ---------------------------------------------
     * @desc Removes whitespaces from line beginning and end.
     * @param {string} line - The line of code to prepare.
     * @return {string}
     * @private
     */
    function prepareLine(line) {

      prettify.debug.start('prepareLine', line);
      prettify.debug.args('prepareLine', line, 'string');

      /** @type {number} */
      var i;
      /** @type {number} */
      var frontTrimCount;
      /** @type {string} */
      var trimPart;

      // Trim ending whitespaces
      if (line) {
        i = line.length - 1;
        if (line.charAt(i) === ' ') {
          --i;
          while (line.charAt(i) === ' ') {
            --i;
          }
          line = line.substr(0, i);
        }
      }

      // Trim beginning whitespaces
      frontTrimCount = config.trimSpace;
      if (line && frontTrimCount) {

        trimPart = ( (frontTrimCount < line.length) ?
          line.substr(0, frontTrimCount) : ''
        );
        if (trimPart && !/[^\s]/.test(trimPart)) {
          // Trim full count
          line = line.substr(frontTrimCount);
        }
        else {
          // Trim partial count
          i = 0;
          while (line.charAt(i) === ' ') {
            ++i;
          }
          line = line.substr(i);
        }
      }

      return line;
    }

    /**
     * ---------------------------------------------
     * Private Method (makeKeywordObj)
     * ---------------------------------------------
     * @desc Creates a keyword object.
     * @param {string} cat - The keyword's category.
     * @param {string=} href - The keyword's details link.
     * @param {boolean=} props - Whether the keyword has properties.
     * @return {Object<string, (string|numberMap)>}
     * @private
     */
    function makeKeywordObj(cat, href, props) {

      var debugArgs;
      prettify.debug.start('makeKeywordObj', cat, href, props);
      debugArgs = [ 'makeKeywordObj' ];
      debugArgs.push(cat, 'string', href, 'string=', props, 'boolean=');
      prettify.debug.args(debugArgs);

      /** @type {Object<string, (string|numberMap)>} */
      var obj;

      href = href || '';
      props = props || false;

      obj = {};

      obj.cat = cat;
      obj.href = href;
      obj.props = (props) ? {} : false;

      return Object.freeze(obj);
    }

    /**
     * ---------------------------------------------
     * Private Method (makePropObj)
     * ---------------------------------------------
     * @desc Creates a keyword property object.
     * @param {string=} href - The keyword's details link.
     * @return {stringMap}
     * @private
     */
    function makePropObj(href) {

      prettify.debug.start('makePropObj', href);
      prettify.debug.args('makePropObj', href, 'string=');

      /** @type {stringMap} */
      var obj;

      href = href || '';

      obj = {};
      obj.href = href;

      return Object.freeze(obj);
    }
