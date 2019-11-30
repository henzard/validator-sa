## Constants

<dl>
<dt><a href="#isValidSouthAfricanIDNumber">isValidSouthAfricanIDNumber</a></dt>
<dd><p>Validates if the string given is an ID number.</p>
<h2>Testing</h2>
<p>If you need a fake ID number for testing, use
<a href="https://chris927.github.io/generate-sa-idnumbers/">this</a>.</p></dd>
<dt><a href="#normalizeSouthAfricanIDNumber">normalizeSouthAfricanIDNumber</a></dt>
<dd><p>Normalizes a string representing an ID number.</p>
<p>TODO: currently, if the ID number is invalid, it normalizes it to an empty
string, not sure this is a good idea.</p></dd>
<dt><a href="#getValidationErrors">getValidationErrors</a></dt>
<dd><p>For a given value, determines a list of validation errors.</p></dd>
</dl>

<a name="isValidSouthAfricanIDNumber"></a>

## isValidSouthAfricanIDNumber
<p>Validates if the string given is an ID number.</p>
<h2>Testing</h2>
<p>If you need a fake ID number for testing, use
<a href="https://chris927.github.io/generate-sa-idnumbers/">this</a>.</p>

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| idnumber | <code>string</code> | <p>The idnumber to validate.</p> |

<a name="normalizeSouthAfricanIDNumber"></a>

## normalizeSouthAfricanIDNumber
<p>Normalizes a string representing an ID number.</p>
<p>TODO: currently, if the ID number is invalid, it normalizes it to an empty
string, not sure this is a good idea.</p>

**Kind**: global constant  
<a name="getValidationErrors"></a>

## getValidationErrors
<p>For a given value, determines a list of validation errors.</p>

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>String</code> | 

