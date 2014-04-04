
// Polymer component declaration
		Polymer('polymer-speedread', {
			readText:		'Read',
			speed:			0,
			speedMax:		50,
			speedMin:		300,
			wordStart:		'',
			wordCenter:		'',
			wordEnd:		'',
			wordList:		[],
			currentWord:	0,
			idTimeout:		null,


			ready: function() {
				this.speed = 20;
				this.initWordList();
			},

			// Initialize the word list
			initWordList: function(){
				// separate line-breaks, to consider them as a specific array element
				// (We try to get \n minimum once (+) and replace it by [space]\n[space]
				//  so the split can consider it as one separate item)
				var wordList = this.trim(this.textContent).replace(/\n+/g,' \n ');
				this.wordList = wordList.split(' ');
				this.currentWord = 0;
				clearTimeout(this.idTimeout);
			},

			speedChanged: function(oldValue, newValue){
				this.speedMs = ((this.speedMin-this.speedMax)*(100-newValue)/100)+this.speedMax;
				this.speedWord = Math.floor(60000/this.speedMs);
			},

			read: function(){
				if(this.readText === 'Read'){
					this.readText = 'Pause';
					this.readWord();
					
				}else{
					this.readText = 'Read';
					clearTimeout(this.idTimeout);
				}
			},

			reset: function(){
				this.readText = 'Read';
				this.currentWord = 0;
				this.wordStart = '';
				this.wordCenter = '';
				this.wordEnd = '';
				clearTimeout(this.idTimeout);
			},

			back: function(){
				this.currentWord = (this.currentWord - 10 > 0)? this.currentWord-10 : 0 ;
			},

			// Read a word
			readWord: function(){
				var w = this.wordList[this.currentWord];
				var c = Math.round(w.length/2);

				// Slicing the word
				this.wordStart = w.substring(0, c-1);
				this.wordCenter = w[c-1];
				this.wordEnd = w.substring(c);
				console.log('[readWord]] %s[%s]%s',this.wordStart,this.wordCenter,this.wordEnd);

				// Set the cursor on the next word
				this.currentWord++;

				// Is it finished ?
				if(this.currentWord >= this.wordList.length){
					this.currentWord = 0;
					clearTimeout(this.idTimeout);
				}else{
					// Check the current speed choosen
					var speed = this.speedMs;

					// If we encounter a line-break, let's do a pause
					if(this.wordCenter==='\n') speed = speed*5;

					// Wait a bit, and read next word
					this.idTimeout = window.setTimeout(this.readWord.bind(this),speed);
				}
			},

			// Text changed ? Reinitialize the word list
			textChanged: function() {
				this.initWordList();
			},


			trim: function(str) {
				return str.replace(/^[^\S\n]+/gm,'');
			}

		});

