var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.onload = function() {
  sortBookmarks();
}
document.body.appendChild(script);

function sortBookmarks() {
  var bookmarks = $('a');
  $('dl').remove();

  bookmarks.sort(function(a, b) {
    var bookmarkOneAdded = $(a).attr('add_date');
    var bookmarkTwoAdded = $(b).attr('add_date');

    return bookmarkTwoAdded - bookmarkOneAdded;
  });

  var previousBookmarkDate = new Date(0);

  var ul = $('<ul>');
  $.each(bookmarks, function(index, bookmark) {
    var currentBookmarkDateInSeconds = $(bookmark).attr('add_date');
    var currentBookmarkDate = new Date(0);
    currentBookmarkDate.setUTCSeconds(currentBookmarkDateInSeconds);

    if (currentBookmarkDate.toDateString() != previousBookmarkDate.toDateString()) {
      var heading = $('<h2>');
      heading.text(currentBookmarkDate.toDateString());
      var li = $('<li>');
      li.append(heading);
      ul.append(li);
    };

    var img = $('<img>');
    img.attr('src', $(bookmark).attr('icon'));
    var li = $('<li>');
    li.append(img);
    li.append(bookmark);
    ul.append(li);

    $(bookmark).removeAttr('icon');

    previousBookmarkDate = currentBookmarkDate;
  });

  $('body').append(ul);
};
