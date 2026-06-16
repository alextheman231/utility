import { describe, expect, test } from "vitest";

import { escapeHTML } from "src/root";

describe("escapeHTML", () => {
  test("Escapes &", () => {
    expect(escapeHTML("&")).toBe("&amp;");
  });
  test("Escapes <", () => {
    expect(escapeHTML("<")).toBe("&lt;");
  });
  test("Escapes >", () => {
    expect(escapeHTML(">")).toBe("&gt;");
  });
  test('Escapes "', () => {
    expect(escapeHTML('"')).toBe("&quot;");
  });
  test("Escapes '", () => {
    expect(escapeHTML("'")).toBe("&#39;");
  });
  test("Escapes a string containing a mix of HTML fragments", () => {
    expect(
      escapeHTML(
        'Hello, my name is "Alex" & I am > 20 but < 30. I am writing this in a repository in Alex\'s organisation.',
      ),
    ).toBe(
      "Hello, my name is &quot;Alex&quot; &amp; I am &gt; 20 but &lt; 30. I am writing this in a repository in Alex&#39;s organisation.",
    );
  });
  test("Escapes multiple occurrences", () => {
    expect(escapeHTML("<<<>>>")).toBe("&lt;&lt;&lt;&gt;&gt;&gt;");
  });
});
