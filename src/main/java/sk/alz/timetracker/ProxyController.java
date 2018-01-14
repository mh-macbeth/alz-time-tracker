package sk.alz.timetracker;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
public class ProxyController {
	private static final String FORWARD_TO = "http://192.168.99.100:8080/records";

	@Autowired
	private Environment env;
	private String url;

	@RequestMapping(value = "/times/", method = RequestMethod.GET)
	@ResponseBody
	private String getTimes(HttpServletResponse response, @RequestParam String email) {
		RestTemplate rt = new RestTemplate();

		UriComponents uri = UriComponentsBuilder.fromHttpUrl(getUrl()).query("email={email}").buildAndExpand(email);
		ResponseEntity<String> res = rt.exchange(uri.toUriString(), HttpMethod.GET, null, String.class);

		response.setStatus(res.getStatusCodeValue());
		return res.getBody();
	}

	@RequestMapping(value = "/times/", method = RequestMethod.POST)
	@ResponseBody
	private String addTime(HttpServletResponse response, @RequestParam MultiValueMap<String, String> params) {
		RestTemplate rt = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(params,
				headers);
		ResponseEntity<String> res = rt.postForEntity(getUrl(), request, String.class);

		response.setStatus(res.getStatusCodeValue());
		return res.getBody();
	}

	private String getUrl() {
		if (url == null) {
			String prop = env.getProperty("forwardUrl");
			url = StringUtils.hasText(prop) ? prop : FORWARD_TO;
		}
		return url;
	}

}
