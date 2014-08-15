require 'bundler/setup'

require 'date'
require 'nokogiri'

bookmarks_file = ARGV.shift
unless bookmarks_file
  puts "Usage: #{__FILE__} <bookmarks-file>"
  exit 1
end

class Bookmark
  attr_reader :added, :title, :url, :icon
  def initialize(added, title, url, icon)
    @added, @title, @url, @icon = added, title, url, icon
  end
  def date
    added.to_date
  end
end

Bookmarks = []

html = File.read(bookmarks_file)
doc = Nokogiri::HTML(html)
doc.search('a').each do |link|
  url = link.attributes['href']

  added_at = link.attributes['add_date']
  icon = link.attributes['icon']

  url = url.value if url
  added_at = added_at.value if added_at
  added_at = DateTime.strptime(added_at, '%s') if added_at
  icon = icon.value if icon

  title = link.inner_text.strip

  next unless url

  Bookmarks << Bookmark.new(added_at, title, url, icon)
end

bookmarks_by_date = Hash.new { |hash, key| hash[key] = [] }

Bookmarks.inject(bookmarks_by_date) do |hash, bookmark|
  hash[bookmark.date] << bookmark
  hash
end

bookmarks_by_date.sort.each do |date, bookmarks|
  puts "## #{date}"
  puts ""
  bookmarks.each do |bookmark|
    puts "* [#{bookmark.title}](#{bookmark.url})"
  end
  puts ""
end
