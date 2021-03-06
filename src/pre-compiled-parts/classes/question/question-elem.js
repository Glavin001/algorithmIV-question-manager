  /**
   * -----------------------------------------------------
   * Public Class (QuestionElem)
   * -----------------------------------------------------
   * @desc An object containing the question's html element.
   * @param {number} id - The id of the question.
   * @constructor
   */
  var QuestionElem = function(id) {

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.root)
     * -----------------------------------------------
     * @desc The question's root element.
     * @type {element}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.info)
     * -----------------------------------------------
     * @desc The question's div.info element.
     * @type {element}
     */
    this.info;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.solution)
     * -----------------------------------------------
     * @desc The question's div.solution element.
     * @type {element}
     */
    this.solution;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.pre)
     * -----------------------------------------------
     * @desc The question's div.preContain element.
     * @type {element}
     */
    this.pre;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.code)
     * -----------------------------------------------
     * @desc The question's code element.
     * @type {element}
     */
    this.code;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    this.root = document.createElement('section');
    this.info = document.createElement('div');

    this.root.id = 'aIV-q' + id;

    this.root.className = 'question';
    this.info.className = 'info';

    this.root.appendChild(this.info);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  QuestionElem.prototype.constructor = QuestionElem;

  /**
   * -----------------------------------------------------
   * Public Method (QuestionElem.prototype.addContent)
   * -----------------------------------------------------
   * @desc Adds the question's contents to its element.
   * @param {{
   *   id      : string,
   *   url     : string,
   *   complete: string,
   *   source  : {
   *     id  : string,
   *     name: string
   *   },
   *   mainCat : {
   *     ids  : strings,
   *     h3   : ?string,
   *     names: ?strings
   *   },
   *   subCat  : {
   *     ids  : strings,
   *     h3   : ?string,
   *     names: ?strings
   *   },
   *   links   : links,
   *   problem : string,
   *   descr   : string,
   *   solution: {
   *     prettyCode: string,
   *     lineCount : number
   *   },
   *   output  : string
   * }} question - The formatted question details.
   */
  QuestionElem.prototype.addContent = function(question) {

    /** @type {element} */
    var root;
    /** @type {element} */
    var info;
    /** @type {boolean} */
    var testTextContent;

    root = this.root;
    info = this.info;
    testTextContent = !!document.body.textContent;

    // Append all the sections of the question
    // Note: See the below private helper methods for more details

    if (question.id) {
      appendId.call(this, question.id, question.url);
    }

    if (question.source.name) {
      appendSource.call(this, question.source);
    }

    if (question.complete) {
      appendComplete.call(this, question.complete);
    }

    if (question.mainCat.h3 || question.subCat.h3) {
      appendCategory.call(this, question.mainCat, question.subCat);
    }

    if (question.problem || question.descr) {
      appendProblem.call(this, question.problem, question.descr);
    }

    if ( question.solution.hasOwnProperty('prettyCode') ) {
      appendSolution.call(this, question.solution);
    }

    if (question.output) {
      appendOutput.call(this, question.output);
    }

    if (question.links.length) {
      appendLinks.call(this, question.links);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendId)
     * ---------------------------------------------
     * @desc Appends the question id.
     * @todo Add url parsing logic.
     * @param {string} id - The question id.
     * @param {string} url - The question id url.
     * @private
     */
    function appendId(id, url) {

      /** @type {boolean} */
      var config;
      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;
      /** @type {element} */
      var a;

      config = app.config.links.get('id');

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'idContain';

      if (testTextContent) {
        h3.textContent = 'Question:';
        if (!config) {
          p.textContent = id;
        }
      }
      else {
        h3.innerHTML = 'Question:';
        if (!config) {
          p.innerHTML = id;
        }
      }

      // Add the anchor link
      if (config) {
        a = makeIdLink.call(this, id, url);
        p.appendChild(a);
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (makeIdLink)
     * ---------------------------------------------
     * @desc Creates an anchor element for the question id.
     * @todo Add url parsing logic.
     * @param {string} id - The question id.
     * @param {string} url - The question id url.
     * @return {element} The anchor element.
     * @private
     */
    function makeIdLink(id, url) {

      /** @type {element} */
      var a;

      if (!url) {
        url = Number(id);
      }

      a = document.createElement('a');
      a.href = 'id/' + url;
      a.innerHTML = id;
      a.onclick = (function(id) {
        return function() {
          Events.linkId( Number(id) );
          return false;
        };
      })(id);

      return a;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSource)
     * ---------------------------------------------
     * @desc Appends the question's source.
     * @param {stringMap} source - The id and name of the source.
     * @private
     */
    function appendSource(source) {

      /** @type {boolean} */
      var config;
      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;
      /** @type {element} */
      var a;

      config = app.config.links.get('source');

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'source';

      if (testTextContent) {
        h3.textContent = 'Source:';
        if (!config) {
          p.textContent = source.name;
        }
      }
      else {
        h3.innerHTML = 'Source:';
        if (!config) {
          p.innerHTML = source.name;
        }
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);

      // Add the anchor link
      if (config) {
        a = makeSourceLink.call(this, source.id, source.name);
        p.appendChild(a);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (makeSourceLink)
     * ---------------------------------------------
     * @desc Creates an anchor element for the question's source.
     * @param {string} id - The source's id.
     * @param {string} name - The source's name.
     * @return {element} The anchor element.
     * @private
     */
    function makeSourceLink(id, name) {

      /** @type {string} */
      var url;
      /** @type {element} */
      var a;

      url = app.sources.get(id, 'url');

      a = document.createElement('a');
      a.href = 'source/' + url;
      a.className = 'dark';
      a.innerHTML = name;
      a.onclick = (function(id) {
        return function() {
          Events.linkSource(id);
          return false;
        };
      })(id);

      return a;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendComplete)
     * ---------------------------------------------
     * @desc Appends the question's completion status.
     * @param {string} complete - The question's status.
     * @private
     */
    function appendComplete(complete) {

      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'stage';

      if (testTextContent) {
        h3.textContent = 'Completed:';
        p.textContent  = complete;
      }
      else {
        h3.innerHTML = 'Completed:';
        p.innerHTML = complete;
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendCategory)
     * ---------------------------------------------
     * @desc Appends the question's categories.
     * @param {Object} main - The question's main categories.
     * @param {Object} sub - The question's sub categories.
     * @private
     */
    function appendCategory(main, sub) {

      /** @type {element} */
      var contain;
      /** @type {element} */
      var mainDiv;
      /** @type {element} */
      var subDiv;

      contain = document.createElement('div');
      contain.className = 'category';

      // Add the main categories
      if (main.h3) {

        mainDiv = document.createElement('div');
        mainDiv.className = 'mainCategory';

        appendMainCategories.call(this, main, mainDiv);

        contain.appendChild(mainDiv);
      }

      // Add the sub categories
      if (sub.h3) {

        subDiv = document.createElement('div');
        subDiv.className = 'subCategory';

        appendSubCategories.call(this, sub, subDiv);

        contain.appendChild(subDiv);
      }

      root.appendChild(contain);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendMainCategories)
     * ---------------------------------------------
     * @desc Appends the question's main categories.
     * @param {Object} main - The question's main categories.
     * @param {element} div - The DOM container for the main categories.
     * @private
     */
    function appendMainCategories(main, div) {

      /** @type {boolean} */
      var config;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {element} */
      var a;

      config = app.config.links.get('category');

      h3 = document.createElement('h3');
      p  = document.createElement('p');

      if (testTextContent) {
        h3.textContent = main.h3;
        if (!config) {
          p.textContent = main.names.join(', ');
        }
      }
      else {
        h3.innerHTML = main.h3;
        if (!config) {
          p.innerHTML = main.names.join(', ');
        }
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each main category's anchor tag
      if (config) {
        len = main.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeMainCatLink.call(this, main.ids[i], main.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.appendChild( makeLinkSpan.call(this) );
          }
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSubCategories)
     * ---------------------------------------------
     * @desc Appends the question's sub categories.
     * @param {Object} sub - The question's sub categories.
     * @param {element} div - The DOM container for the sub categories.
     * @private
     */
    function appendSubCategories(sub, div) {

      /** @type {boolean} */
      var config;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {element} */
      var a;

      config = app.config.links.get('category');

      h3 = document.createElement('h3');
      p  = document.createElement('p');

      if (testTextContent) {
        h3.textContent = sub.h3;
        if (!config) {
          p.textContent = sub.names.join(', ');
        }
      }
      else {
        h3.innerHTML = sub.h3;
        if (!config) {
          p.innerHTML = sub.names.join(', ');
        }
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each sub category's anchor tag
      if (config) {
        len = sub.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeSubCatLink.call(this, sub.ids[i], sub.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.appendChild( makeLinkSpan.call(this) );
          }
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (makeMainCatLink)
     * ---------------------------------------------
     * @desc Creates a main category link.
     * @todo Add url parsing logic to event.
     * @param {string} id - The main category's id.
     * @param {string} name - The main category's name.
     * @return {element} The anchor link.
     * @private
     */
    function makeMainCatLink(id, name) {

      /** @type {string} */
      var url;
      /** @type {element} */
      var a;

      url = app.categories.get(id, 'url');

      a = document.createElement('a');
      a.href = 'category/' + url;
      a.className = 'dark';
      a.innerHTML = name;
      a.onclick = (function(id) {
        return function() {
          Events.linkMainCat(id);
          return false;
        };
      })(id);

      return a;
    }

    /**
     * ---------------------------------------------
     * Private Method (makeSubCatLink)
     * ---------------------------------------------
     * @desc Creates a sub category link.
     * @todo Add url parsing logic and remove the use of
     *   indexOf to find the sub category's parent.
     * @param {string} id - The sub category's id.
     * @param {string} name - The sub category's name.
     * @return {element} The anchor link.
     * @private
     */
    function makeSubCatLink(id, name) {

      /** @type {string} */
      var url;
      /** @type {element} */
      var a;
      /** @type {string} */
      var parentId;
      /** @type {string} */
      var parentUrl;

      // Set the sub category's parent id and url
      app.categories.ids.some(function(/** string */ catId) {
        /** @private */
        var category;
        /** @private */
        var subs;

        category = app.categories.get(catId);
        subs = category.get('subs');
        if (subs && subs.indexOf(id) !== -1) {
          parentId  = catId;
          parentUrl = category.get('url');
          return true;
        }

        return false;
      });

      url = app.categories.get(id, 'url');

      a = document.createElement('a');
      a.href = 'category/' + parentUrl + '/' + url;
      a.className = 'dark';
      a.innerHTML = name;
      a.onclick = (function(id, parentId) {
        return function() {
          Events.linkSubCat(id, parentId);
          return false;
        };
      })(id, parentId);

      return a;
    }

    /**
     * ---------------------------------------------
     * Private Method (makeLinkSpan)
     * ---------------------------------------------
     * @desc Creates a span element for spacing between links.
     * @return {element} The span element.
     * @private
     */
    function makeLinkSpan() {

      /** @type {element} */
      var span;

      span = document.createElement('span');
      span.innerHTML = ',&nbsp;&nbsp;';

      return span;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendProblem)
     * ---------------------------------------------
     * @desc Appends the question's problem or description.
     * @param {string} problem - The question's problem.
     * @param {string} descr - The question's description.
     * @private
     */
    function appendProblem(problem, descr) {

      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'problem';

      if (testTextContent) {
        h3.textContent = (problem) ? 'Problem:' : 'Description:';
      }
      else {
        h3.innerHTML = (problem) ? 'Problem:' : 'Description:';
      }
      p.innerHTML = (problem) ? problem : descr;

      div.appendChild(h3);
      div.appendChild(p);

      root.appendChild(div);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSolution)
     * ---------------------------------------------
     * @desc Appends the question's solution.
     * @param {Object} solution - The question's solution.
     * @private
     */
    function appendSolution(solution) {

      /** @type {element} */
      var contain;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var preDiv;
      /** @type {element} */
      var pre;
      /** @type {element} */
      var code;
      /** @type {element} */
      var ol;
      /** @type {number} */
      var height;

      contain  = document.createElement('div');
      h3       = document.createElement('h3');
      preDiv   = document.createElement('div');
      pre      = document.createElement('pre');
      code     = document.createElement('code');
      ol       = document.createElement('ol');

      contain.className = 'solution';
      preDiv.className     = 'preContain';

      ol.innerHTML = solution.prettyCode;

      if (testTextContent) {
        h3.textContent = 'Solution:';
      }
      else {
        h3.innerHTML = 'Solution:';
      }

      height = solution.lineCount * app.elems.code.li.height;
      height += app.elems.code.ol.height;
      preDiv.style.height = height + 'px';

      contain.appendChild(h3);
      contain.appendChild(preDiv);
      preDiv.appendChild(pre);
      pre.appendChild(code);
      code.appendChild(ol);

      root.appendChild(contain);

      this.solution = contain;
      this.pre = preDiv;
      this.code = code;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendOutput)
     * ---------------------------------------------
     * @desc Appends the solution's output for this question.
     * @param {string} output - The solution's output.
     * @private
     */
    function appendOutput(output) {

      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'output';

      if (testTextContent) {
        h3.textContent = 'Output:';
      }
      else {
        h3.innerHTML = 'Output:';
      }

      p.innerHTML    = output;

      div.appendChild(h3);
      div.appendChild(p);

      root.appendChild(div);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendLinks)
     * ---------------------------------------------
     * @desc Appends the question's links.
     * @param {links} links - The question's links.
     * @private
     */
    function appendLinks(links) {

      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'links';

      if (testTextContent) {
        h3.textContent = 'Links:';
      }
      else {
        h3.innerHTML = 'Links:';
      }

      div.appendChild(h3);
      div.appendChild(p);

      links.forEach(function(/** Object */ linkObj) {
        /** @type {element} */
        var a;

        a = document.createElement('a');
        a.href = linkObj.href;
        a.target = '_blank';
        if (testTextContent) {
          a.textContent = linkObj.name;
        }
        else {
          a.innerHTML = linkObj.name;
        }
        p.appendChild(a);
      });

      root.appendChild(div);
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (QuestionElem.prototype.addCodeExt)
   * -----------------------------------------------------
   * @desc If overflow occurs in a code element it enables the auto
   *   extend button for the question.
   * @type {function}
   */
  QuestionElem.prototype.addCodeExt = function() {

    /** @type {number} */
    var overflow;
    /** @type {number} */
    var scrollbar;
    /** @type {element} */
    var code;
    /** @type {element} */
    var ext;
    /** @type {element} */
    var extClose;
    /** @type {element} */
    var extOpen;
    /** @type {element} */
    var extBG;
    /** @type {element} */
    var extHov;
    /** @type {element} */
    var extHovC;
    /** @type {element} */
    var extHovO;
    /** @type {boolean} */
    var testTextContent;

    code = this.code;

    overflow = code.scrollWidth - code.clientWidth;

    if (overflow < 1) {
      this.root.style.display = 'none';
      this.root.style.opacity = '1';
      return;
    }

    scrollbar = app.elems.scrl.height;
    if (scrollbar > 0) {
      this.solution.style.paddingBottom = scrollbar + 'px';
    }

    testTextContent = !!document.body.textContent;

    ext      = document.createElement('div');
    extClose = document.createElement('div');
    extOpen  = document.createElement('div');
    extBG    = document.createElement('div');
    extHov   = document.createElement('div');
    extHovC  = document.createElement('span');
    extHovO  = document.createElement('span');

    ext.className      = 'extContain';
    extClose.className = 'extCloseArrow';
    extOpen.className  = 'extOpenArrow';
    extBG.className    = 'extBG';
    extHov.className   = 'extHover';
    extHovC.className  = 'closeExt';
    extHovO.className  = 'openExt';

    if (testTextContent) {
      extOpen.textContent = 'open';
      extHovC.textContent = 'Close Extended Code View';
      extHovO.textContent = 'Extend Code View';
    }
    else {
      extOpen.innerHTML = 'open';
      extHovC.innerHTML = 'Close Extended Code View';
      extHovO.innerHTML = 'Extend Code View';
    }

    extOpen.onmouseover = function() {
      extHov.style.opacity = '1';
    };

    extOpen.onmouseout = function() {
      extHov.style.opacity = '0';
    };

    extOpen.onclick = (function(overflow, code, ext, extOpen,
                                extClose, extHovO, extHovC) {
      /** @type {elementMap} */
      var elems;

      elems = {
        code    : code,
        ext     : ext,
        extOpen : extOpen,
        extClose: extClose,
        extHovO : extHovO,
        extHovC : extHovC
      };
      Object.freeze(elems);

      return function() {
        Events.extCodeView(overflow, elems);
      };
    })(overflow, code, ext, extOpen, extClose, extHovO, extHovC);

    ext.appendChild(extClose);
    ext.appendChild(extOpen);
    ext.appendChild(extBG);
    extHov.appendChild(extHovC);
    extHov.appendChild(extHovO);

    this.pre.appendChild(ext);
    this.pre.appendChild(extHov);

    this.root.style.display = 'none';
    this.root.style.opacity = '1';
  };
