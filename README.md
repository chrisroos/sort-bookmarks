Some toy scripts I created to explore my bookmarks exported from Google Chrome. The bookmarks are exported in the [Netscape Bookmark File Format][].

## sort-bookmarks.js

Open your HTML bookmarks file in a browser (I've tried Chrome) and evaluate the contents of this JavaScript in the developer console. You should see the bookmarks grouped under daily headings.

## sort-bookmarks.rb

### Tidying the input HTML

Before doing anything with this, you'll want to tidy the bookmarks html file. Nokogiri has a problem parsing the Netscape Bookmark format (best guess is that it's something to do with the unclosed `<dt>` elements).

    $ tidy bookmarks.html > bookmarks.tidied.html

### Running the script

Running the script will generate a Markdown file of your bookmarks grouped by day.

*NOTE.* Some of the bookmark titles have newlines which screws with the Markdown formatting, but this was good enough for what I was after.

    $ ruby sort-bookmarks.rb bookmarks.tidied.html

#### Example output

    ## 2014-08-14

    * [Awesome Screenshot URL tracking and niki-bot | mig5.net](https://mig5.net/content/awesome-screenshot-and-niki-bot)
    * [Ray Newton, Historian Of Shadwell | Spitalfields Life](http://spitalfieldslife.com/2014/08/14/ray-newton-historian-of-shadwell/)

    ## 2014-08-15

    * [What society are we building here? | BuzzMachine](http://buzzmachine.com/2014/08/14/society-building/)
    * [Unoriginal sin â€” BuzzMachine](http://buzzmachine.com/2014/08/14/dystopia-com/)

[Netscape Bookmark File Format]: http://msdn.microsoft.com/en-us/library/aa753582(VS.85).aspx
