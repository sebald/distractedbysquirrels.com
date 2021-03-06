module PrettyDateFilter

	# Returns a datetime if the input is a string
	def datetime(date)
	  if date.class == String
	    date = Time.parse(date)
	  end
	  date
	end

	# Returns an ordidinal date eg July 22 2007 -> July 22nd 2007
	def ordinalize(date)
	  date = datetime(date)
	  "#{date.strftime('%b')} #{ordinal(date.strftime('%e').to_i)}, #{date.strftime('%Y')}"
	end

	# Returns an ordinal number. 13 -> 13th, 21 -> 21st etc.
	def ordinal(number)
	  if (11..13).include?(number.to_i % 100)
	    "#{number}<sup>th</sup>"
	  else
	    case number.to_i % 10
	    when 1; "#{number}<sup>st</sup>"
	    when 2; "#{number}<sup>nd</sup>"
	    when 3; "#{number}<sup>rd</sup>"
	    else    "#{number}<sup>th</sup>"
	    end
	  end
	end

	def pretty_date( date )
		date = datetime(date)
		ordinalize(date)
	end

end

Liquid::Template.register_filter(PrettyDateFilter)
