---
title: Math example
description: Learn more about my project in this docs site built with Starlight.


---
<link href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" rel="stylesheet">


Welcome to my Guides!

## Math example

Lift($$L$$) can be determined by Lift Coefficient ($$C_L$$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$



```latex
<link href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" rel="stylesheet">


Lift($$L$$) can be determined by Lift Coefficient ($$C_L$$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

```

Calculates Darcy friction factor using the Colebrook equation
originally published in [1]_. Normally, this function uses an exact
solution to the Colebrook equation, derived with a CAS. A numerical can
also be used.

$$
    \frac{1}{\sqrt{f}}=-2\log_{10}\left(\frac{\epsilon/D}{3.7}
    +\frac{2.51}{\text{Re}\sqrt{f}}\right)
$$


Parameters
----------
- Re : float
    Reynolds number, [-]
- eD : float
    Relative roughness, [-]
- tol : float, optional
    None for analytical solution (default); user specified value to use the
    numerical solution; 0 to use `mpmath` and provide a bit-correct exact
    solution to the maximum fidelity of the system's `float`;
    -1 to apply the Clamond solution where appropriate for greater speed
    (Re > 10), [-]

Returns
-------
- fd : float
    Darcy friction factor [-]

Notes
-----
The solution is as follows:

$$
    f_d = \frac{\ln(10)^2\cdot {3.7}^2\cdot{2.51}^2}
    {\left(\ln(10)\epsilon/D\cdot\text{Re} - 2\cdot 2.51\cdot 3.7\cdot
    \text{lambertW}\left[\ln(\sqrt{10})\sqrt{
    10^{\left(\frac{\epsilon \text{Re}}{2.51\cdot 3.7D}\right)}
    \cdot \text{Re}^2/{2.51}^2}\right]\right)}
$$

Some effort to optimize this function has been made. The `lambertw`
function from scipy is used, and is defined to solve the specific function:

$$
    y = x\exp(x)

    \text{lambertW}(y) = x
$$

This is relatively slow despite its explicit form as it uses the
mathematical function `lambertw` which is expensive to compute.

For high relative roughness and Reynolds numbers, an OverflowError can be
encountered in the solution of this equation. The numerical solution is
then used.

The numerical solution provides values which are generally within an
rtol of 1E-12 to the analytical solution; however, due to the different
rounding order, it is possible for them to be as different as rtol 1E-5 or
higher. The 1E-5 accuracy regime has been tested and confirmed numerically
for hundreds of thousand of points within the region 1E-12 < Re < 1E12
and 0 < eD < 0.1.

The numerical solution attempts the secant method using `scipy`'s `newton`
solver, and in the event of nonconvergence, attempts the `fsolve` solver
as well. An initial guess is provided via the `Clamond` function.

The numerical and analytical solution take similar amounts of time; the
`mpmath` solution used when `tol=0` is approximately 45 times slower. This
function takes approximately 8 us normally.

Examples
--------
>>> Colebrook(1E5, 1E-4)
0.018513866077471

References
----------
.. [1] Colebrook, C F."Turbulent Flow in Pipes, with Particular Reference
    to the Transition Region Between the Smooth and Rough Pipe Laws."
    Journal of the ICE 11, no. 4 (February 1, 1939): 133-156.
    doi:10.1680/ijoti.1939.13150.
