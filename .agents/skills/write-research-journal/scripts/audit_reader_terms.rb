# ABOUTME: Inventories implementation labels and research jargon in Japanese journal bodies.
# ABOUTME: Produces human-review candidates without treating every English term as an error.

DEFAULT_GLOB = "src/content/docs/research/*/journal/*.md"

TERM_PATTERNS = {
  "experiment term" => /(?<![A-Za-z0-9_])(?:run|memory|Classroom|Tutor|scorer|fallback|moderator|Stage|MDE|DV|seed|containment|prompt|profile|report)(?![A-Za-z0-9_])/i,
  "statistical term" => /(?:n\s*=|実効n|床効果|天井効果|標本標準偏差|疑似反復|交絡|用量反応)/,
  "stored field or label" => /`[^`]*(?:_[^`]*)+`/,
  "English phrase" => /`?(?:source-side strength|over-repair attractor|paper draft|representation level|mastery tutoring)`?/i
}.freeze

def journal_paths(arguments)
  paths = arguments.empty? ? Dir.glob(DEFAULT_GLOB) : arguments
  paths.flat_map { |path| File.directory?(path) ? Dir.glob(File.join(path, "**", "*.md")) : path }.uniq.sort
end

def body_lines(path)
  lines = File.readlines(path, chomp: true)
  in_frontmatter = lines.first == "---"
  in_fence = false
  in_comment = false

  lines.filter_map.with_index(1) do |line, line_number|
    if in_frontmatter
      in_frontmatter = false if line_number > 1 && line == "---"
      next
    end

    if line.include?("<!--")
      in_comment = true
    end
    if in_comment
      in_comment = false if line.include?("-->")
      next
    end

    if line.start_with?("```")
      in_fence = !in_fence
      next
    end
    next if in_fence

    [line_number, line]
  end
end

paths = journal_paths(ARGV)
abort "No journal files found" if paths.empty?

candidate_count = 0

paths.each do |path|
  candidates = []

  body_lines(path).each do |line_number, line|
    TERM_PATTERNS.each do |category, pattern|
      line.scan(pattern).each do |match|
        value = match.is_a?(Array) ? match.compact.join : match
        candidates << [line_number, category, value]
      end
    end
  end

  next if candidates.empty?

  puts path
  candidates.uniq.each do |line_number, category, value|
    puts "  #{line_number}: #{category}: #{value}"
    candidate_count += 1
  end
end

puts "#{candidate_count} review candidate(s)"
